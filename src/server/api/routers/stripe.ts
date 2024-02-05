const getSampleBody = (amount: number) => {
  return {
    metadata: {},
    checkout: {
      speedPolicy: "HighSpeed",
      paymentMethods: [
        "BTC-LightningNetwork",
        "BTC-OnChain",
      ],
      defaultPaymentMethod: "BTC-LightningNetwork",
      lazyPaymentMethods: false,
      expirationMinutes: 90,
      monitoringMinutes: 90,
      paymentTolerance: 1,
      redirectURL: "https://stisidoreranch.com/success",
      redirectAutomatically: true,
      requiresRefundEmail: true,
      checkoutType: null,
      defaultLanguage: "en-US",
    },
    receipt: {
      enabled: true,
      showQR: null,
      showPayments: null,
    },
    amount,
    currency: "CAD",
    additionalSearchTerms: ["string"],
  };
};

export const getPriceWithDiscount = (
  order:
    | {
        coupon: { multiplier: number } | null;
        totalPrice: number;
      }
    | null
    | undefined,
) => {
  const percentageDiscount = order?.coupon?.multiplier ?? 1;
  const initialPrice = order?.totalPrice ?? 0;
  return initialPrice * percentageDiscount;
};

import { z } from "zod";
import stripe from "~/server/stripe/client";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { env } from "~/env.mjs";

const storeId = env.NEXT_PUBLIC_STORE_ID;

export const btcPayPublicClient = async (
  url: string,
  method: "GET" | "POST" = "GET",
  body?: object,
  optionalHeaders?: Record<string, string>,
) => {
  const headers = optionalHeaders ?? {};
  const optionalBody = body
    ? { body: JSON.stringify(body) }
    : {};
  const rawResponse = await fetch(url, {
    headers: {
      Authorization: `token ${env.NEXT_PUBLIC_BTCPAY_KEY}`,
      ...headers,
    },
    method,
    ...optionalBody,
  });

  return rawResponse.json();
};

export const stripeRouter = createTRPCRouter({
  upsertPaymentIntent: publicProcedure
    .input(
      z.object({
        paymentIntentId: z.string().optional(),
        orderId: z.string(),
      }),
    )
    .mutation(async ({ ctx: { prisma }, input }) => {
      const order = await prisma.order.findUnique({
        where: {
          id: input.orderId,
        },
        include: { coupon: true },
      });

      if (input.paymentIntentId) {
        const paymentIntent =
          await stripe.paymentIntents.update(
            input.paymentIntentId,
            {
              amount: getPriceWithDiscount(order),
              currency: "cad",
            },
          );
        await prisma.order.update({
          where: {
            id: input.orderId,
          },
          data: {
            paymentIntent: paymentIntent.id,
          },
        });
        return paymentIntent;
      } else {
        const paymentIntent =
          await stripe.paymentIntents.create({
            amount: getPriceWithDiscount(order),
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
      }
    }),
  createBTCPayLighteningPaymentIntent: publicProcedure
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
        include: { coupon: true },
      });

      const result = await btcPayPublicClient(
        `${env.NEXT_PUBLIC_BTCPAY_URL}/api/v1/stores/${storeId}/invoices`,
        "POST",
        getSampleBody(getPriceWithDiscount(order) / 100),
        { "Content-Type": "application/json" },
      );
      return result;
    }),
  setOrderPaymentIntent: publicProcedure
    .input(
      z.object({
        orderId: z.string(),
        paymentIntentId: z.string(),
      }),
    )
    .mutation(async ({ ctx: { prisma }, input }) => {
      const order = await prisma.order.findUnique({
        where: {
          id: input.orderId,
        },
      });
      if (!order) {
        throw new Error("Order not found");
      }
      await prisma.order.update({
        where: {
          id: input.orderId,
        },
        data: {
          paymentIntent: input.paymentIntentId,
        },
      });
    }),

  getBtcPayInvoice: publicProcedure
    .input(
      z.object({
        invoiceId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const result = await btcPayPublicClient(
        `${env.NEXT_PUBLIC_BTCPAY_URL}/api/v1/stores/${storeId}/invoices/${input.invoiceId}`,
        "GET",
      );
      return result;
    }),
});
