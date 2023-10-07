import { z } from "zod";
import { getBoxFromSlug } from "~/utils/boxManagement";
import { checkInStock } from "~/server/helpers/inventory";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const orderRouter = createTRPCRouter({
  getOrder: publicProcedure
    .input(
      z.object({
        id: z.string().nullable().optional(),
      }),
    )
    .query(async ({ ctx: { prisma }, input }) => {
      if (input.id === null) {
        return null;
      }

      const propsectiveOrder =
        await prisma.order.findUnique({
          where: {
            id: input.id,
          },

          include: {
            address: true,
            boxes: {
              include: {
                items: true,
              },
            },
          },
        });
      if (propsectiveOrder?.paid) {
        return null;
      }
      return propsectiveOrder;
    }),
  removeItemFromOrder: publicProcedure
    .input(
      z.object({
        orderId: z.string().nullable(),
        slug: z.string(),
        boxId: z.string(),
      }),
    )
    .mutation(async ({ ctx: { prisma }, input }) => {
      const box = getBoxFromSlug(input.slug);
      if (!input.orderId) return null;
      return prisma.order.update({
        where: {
          id: input.orderId,
        },
        data: {
          totalPrice: { decrement: box.totalPrice },
          updatedAt: new Date(),
          boxes: {
            deleteMany: [
              {
                id: input.boxId,
              },
            ],
          },
        },
        include: {
          boxes: true,
          address: true,
        },
      });
    }),

  addToOrder: publicProcedure
    .input(
      z.object({
        slug: z.string(),
        orderId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx: { prisma }, input }) => {
      const box = getBoxFromSlug(input.slug);
      const { neededProducts, status } = await checkInStock(
        box.items,
        prisma,
      );
      if (!status) {
        throw new Error("Not enough items in stock");
      }
      if (input.orderId === undefined) {
        return await prisma.order.create({
          data: {
            totalPrice: box.totalPrice,
            updatedAt: new Date(),
            boxes: {
              create: {
                title: box.title,
                slug: input.slug,
                totalPrice: box.totalPrice,
                boxSize: box.boxSize,
                items: {
                  connect: neededProducts.map((product) => {
                    return { id: product.id };
                  }),
                },
              },
            },
          },

          include: {
            boxes: true,
            address: true,
          },
        });
      }
      return await prisma.order.update({
        where: {
          id: input.orderId,
        },
        data: {
          totalPrice: { increment: box.totalPrice },
          updatedAt: new Date(),
          boxes: {
            create: {
              title: box.title,
              slug: input.slug,
              totalPrice: box.totalPrice,
              boxSize: box.boxSize,
              items: {
                connect: neededProducts.map((product) => {
                  return { id: product.id };
                }),
              },
            },
          },
        },

        include: {
          boxes: true,
          address: true,
        },
      });
    }),
});
