import { getPriceWithDiscount } from "~/utils/lib";

const getSampleBody = (amount: number) => {
  if (env.NODE_ENV === "development") {
    amount = 0;
  }
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

export const paymentsRouter = createTRPCRouter({
  upsertPaymentIntent: publicProcedure
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
      const stripePaymentIntent =
        order?.paymentIntent?.find(
          (elem) => elem.slice(0, 3) == "pi_",
        );
      if (stripePaymentIntent) {
        const paymentIntent =
          await stripe.paymentIntents.update(
            stripePaymentIntent,
            {
              amount: getPriceWithDiscount(order),
              currency: "cad",
            },
          );
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
            paymentIntent: { push: paymentIntent.id },
          },
        });

        return paymentIntent;
      }
    }),

  upsertBtcPaymentIntent: publicProcedure
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
      let invoice;
      if (!order?.btcPayId) {
        invoice = await btcPayPublicClient(
          `${env.NEXT_PUBLIC_BTCPAY_URL}/api/v1/stores/${storeId}/invoices/${order?.btcPayId}`,
          "GET",
        );
      }
      if (!invoice) {
        invoice = await btcPayPublicClient(
          `${env.NEXT_PUBLIC_BTCPAY_URL}/api/v1/stores/${storeId}/invoices`,
          "POST",
          getSampleBody(getPriceWithDiscount(order) / 100),
          { "Content-Type": "application/json" },
        );
        await prisma.order.update({
          where: {
            id: input.orderId,
          },
          data: {
            btcPayId: { push: invoice.id },
          },
        });
      }
      return invoice;
    }),

  getBtcPayInvoice: publicProcedure
    .input(z.object({ orderId: z.string().optional() }))
    .query(async ({ ctx: { prisma }, input }) => {
      if (!input.orderId) return null;
      const order = await prisma.order.findUnique({
        where: {
          id: input.orderId,
        },
      });
      if (!order) {
        return null;
      }
      const invoice = await btcPayPublicClient(
        `${env.NEXT_PUBLIC_BTCPAY_URL}/api/v1/stores/${storeId}/invoices/${order.btcPayId[0]}`,
        "GET",
      );
      return invoice;
    }),
});
