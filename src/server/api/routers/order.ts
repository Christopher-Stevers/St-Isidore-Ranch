import { z } from "zod";
import {
  GroundBeefBox,
  DeluxeBox,
  FamilyBox,
  BarbecueBox,
  SamplerBox,
} from "~/utils/boxTemplates";
import { checkInStock } from "~/server/helpers/inventory";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const orderRouter = createTRPCRouter({
  addToOrder: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        orderId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx: { prisma }, input }) => {
      const getBoxFromClass = (title: string) => {
        switch (title) {
          case "Ground Beef Box":
            return new GroundBeefBox();
          case "Deluxe Box":
            return new DeluxeBox();
          case "Family Box":
            return new FamilyBox();
          case "Barbeque Box":
            return new BarbecueBox();
          case "Sample Box":
            return new SamplerBox();
          default:
            throw new Error("Invalid box title");
        }
      };
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
          },
        });
      }
      return await prisma.order.update({
        where: {
          id: input.orderId,
        },
        data: {
          totalPrice: box.totalPrice,
          updatedAt: new Date(),
          boxes: {
            create: {
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
        },
      });
    }),
});
