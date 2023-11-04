import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { checkInStock } from "~/server/helpers/inventory";
import { getBoxFromSlug } from "~/utils/boxManagement";

export const productRouter = createTRPCRouter({
  addProductsToClass: protectedProcedure
    .input(
      z.object({
        productClassId: z.string(),
        count: z.number(),
      }),
    )
    .mutation(async ({ ctx: { prisma }, input }) => {
      const data = [];
      const practicalCount = Math.abs(input.count);
      for (let i = 0; i < practicalCount; i++) {
        const product = {
          productClassId: input.productClassId,

          quantity: 1,
        };
        data.push(product);
      }
      if (input.count < 0) {
        const productsToDelete =
          await prisma.product.findMany({
            take: input.count,
            where: { productClassId: input.productClassId }, // Retrieve the first 10 posts
          });
        return prisma.product.deleteMany({
          where: {
            id: {
              in: productsToDelete.map(
                (product) => product.id,
              ), // Specify the IDs of the posts to delete
            },
          },
        });
      }

      return prisma.product.createMany({
        data,
      });
    }),
  getInStock: publicProcedure
    .input(z.string())
    .query(async ({ ctx: { prisma }, input }) => {
      const box = getBoxFromSlug(input);
      const items = box.items;
      const { status } = await checkInStock(
        items,
        true,
        prisma,
      );
      return status;
    }),

  getProductByName: publicProcedure
    .input(z.string())
    .query(async ({ ctx: { prisma }, input }) => {
      return prisma.product.findFirst({
        where: {
          productClass: {
            name: input,
          },
        },
      });
    }),
});
