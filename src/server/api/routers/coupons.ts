import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const couponRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.string())

    .query(async ({ ctx: { prisma }, input }) => {
      const coupon = await prisma.coupon.findFirst({
        where: { code: input },
      });
      return coupon;
    }),
});
