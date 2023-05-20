import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  addProductsToClass: protectedProcedure
    .input(z.object({ productClassId: z.string(), count: z.number() }))
    .mutation(({ ctx, input }) => {
      const data = [];
      for (let i = 0; i < input.count; i++) {
        const product = {
          productClassId: input.productClassId,

          quantity: 1,
        };
        data.push(product);
      }

      return ctx.prisma.product.createMany({
        data,
      });
    }),
});
