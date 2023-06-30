import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { checkInStock } from "~/server/helpers/inventory";

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
            take: 10, // Retrieve the first 10 posts
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
  getInStock: protectedProcedure
    .input(
      z.array(
        z.object({
          name: z.string(),
          quantity: z.number(),
        }),
      ),
    )
    .query(async ({ ctx: { prisma }, input }) => {
      const { status } = await checkInStock(input, prisma);
      return status;
    }),
});
