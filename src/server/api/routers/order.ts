import { z } from "zod";
import { getBoxFromClass } from "~/utils/boxTemplates";
import { checkInStock } from "~/server/helpers/inventory";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const orderRouter = createTRPCRouter({
  getOrder: protectedProcedure
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
  removeItemFromOrder: protectedProcedure
    .input(
      z.object({
        orderId: z.string().nullable(),
        boxTitle: z.string(),
        boxId: z.string(),
      }),
    )
    .mutation(async ({ ctx: { prisma }, input }) => {
      const box = getBoxFromClass(input.boxTitle);
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
                title: input.boxTitle,
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

  addToOrder: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        orderId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx: { prisma }, input }) => {
      const box = getBoxFromClass(input.title);
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
                title: input.title,
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
              title: input.title,
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
