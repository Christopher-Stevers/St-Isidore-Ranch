import { z } from "zod";
import stripe from "~/server/stripe/client";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const stripeRouter = createTRPCRouter({
  createPaymentIntent: publicProcedure
    .input(
      z.object({
        orderId: z.string(),
      }),
    )
    .mutation(async ({ ctx: { prisma }, input }) => {
      const order = await prisma.order.findUnique({
        where: {
          id: input.orderId,
        },
      });
      const paymentIntent =
        await stripe.paymentIntents.create({
          amount: order?.totalPrice ?? 0,
          currency: "cad",
          automatic_payment_methods: {
            enabled: true,
          },
        });
      await prisma.order.update({
        where: {
          id: input.orderId,
        },
        data: {
          paymentIntent: paymentIntent.id,
        },
      });

      return paymentIntent;
    }),
});
