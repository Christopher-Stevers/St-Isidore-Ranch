const getSampleBody = (amount: number) => {
  return {
    metadata: {
      orderId: "pos-app_346KRC5BjXXXo8cRFKwTBmdR6ZJ4",
      orderUrl:
        "https://localhost:14142/apps/346KRC5BjXXXo8cRFKwTBmdR6ZJ4/pos",
      itemDesc: "Tea shop",
      posData: {
        tip: 0.48,
        cart: [
          {
            id: "pu erh",
            count: 1,
            image: "~/img/pos-sample/pu-erh.jpg",
            price: {
              type: 2,
              value: 2,
              formatted: "$2.00",
            },
            title: "Pu Erh",
            inventory: null,
          },
          {
            id: "rooibos",
            count: 1,
            image: "~/img/pos-sample/rooibos.jpg",
            price: {
              type: 2,
              value: 1.2,
              formatted: "$1.20",
            },
            title: "Rooibos",
            inventory: null,
          },
        ],
        total: 3.68,
        subTotal: 3.2,
        customAmount: 0,
        discountAmount: 0,
        discountPercentage: 0,
      },
      receiptData: {
        Tip: "$0.48",
        Cart: {
          "Pu Erh": "$2.00 x 1 = $2.00",
          Rooibos: "$1.20 x 1 = $1.20",
        },
      },
    },
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
  console.log(optionalBody, url);
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
      });
      const result = await btcPayPublicClient(
        `${env.NEXT_PUBLIC_BTCPAY_URL}/api/v1/stores/${storeId}/invoices`,
        "POST",
        getSampleBody((order?.totalPrice ?? 0) / 100),
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
});
