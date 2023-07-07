import { z } from "zod";
import { type ProductClass } from "~/typedefs/ProductClass";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const productClassRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAvailableProductsOfClass: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const products = await ctx.prisma.product.count({
        where: {
          productClassId: input.id,
          sold: false,
          Box: null,
        },
      });
      return products;
    }),
  addProductClass: publicProcedure
    .input(z.object({ name: z.string(), src: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.productClass.create({
        data: {
          name: input.name,
          src: input.src,
        },
      });
    }),

  removeProductClass: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.productClass.delete({
        where: {
          id: input.id,
        },
      });
    }),

  getProductClasses: publicProcedure.query(
    async ({ ctx }): Promise<ProductClass[]> => {
      const productClasses =
        await ctx.prisma.productClass.findMany({
          include: {
            _count: {
              select: { products: true },
            },
          },
        });
      return productClasses.map((productClass) => ({
        ...productClass,
        productsCount: productClass._count.products,
      }));
    },
  ),
  updateProductClass: protectedProcedure

    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.productClass.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
