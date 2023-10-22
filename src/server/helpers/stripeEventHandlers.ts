import { prisma } from "~/server/db";
import type Stripe from "stripe";
import stripe from "../../server/stripe/client";
import emailWrapper from "~/server/helpers/emailWrapper";
import {
  clearOrderByPaymentId,
  refundOrder,
  setOrderAsPayed,
} from "~/server/helpers/dbHelpers";
import { htmlMessageTemplate } from "./htmlMessageTemplate";
import { type Product } from "@prisma/client";
import { env } from "process";

export default {
  defaultHandler: async (event: Stripe.Event) => {
    await prisma.stripeEvent.create({
      data: {
        id: event.id,
        type: event.type,
        object: event.object,
        api_version: event.api_version,
        account: event.account,
        created: new Date(event.created * 1000), // convert to milliseconds
        data: {
          object: event.data.object,
          previous_attributes:
            event.data.previous_attributes,
        },
        livemode: event.livemode,
        pending_webhooks: event.pending_webhooks,
        request: {
          id: event.request?.id,
          idempotency_key: event.request?.idempotency_key,
        },
      },
    });
  },
  handleChargeSucceeded: async (
    chargeSucceeded: Stripe.Charge,
  ) => {
    await emailWrapper({
      email: env.EMAIL_USERNAME ?? "",
      subject: "New Order",
      htmlMessage: `New order with id ${chargeSucceeded.id} paymentIntent ${chargeSucceeded.payment_intent} and user email ${chargeSucceeded.billing_details?.email}`,
      message: `New order with id ${chargeSucceeded.id} please enable html email to see full order`,
    });
  },

  handlePaymentIntentPaymentFailed: async (
    paymentIntent: Stripe.PaymentIntent,
  ) => {
    await clearOrderByPaymentId(prisma, paymentIntent.id);
    // free up products
  },

  handlePaymentIntentSucceeded: async (
    paymentIntent: Stripe.PaymentIntent,
  ) => {
    const { id } = paymentIntent;
    const order = await prisma.order.findUnique({
      where: {
        paymentIntent: id,
      },
      include: {
        boxes: {
          include: {
            items: true,
          },
        },
        address: true,
      },
    });
    if (paymentIntent.amount !== order?.totalPrice) {
      await refundOrder(prisma, id);
      await stripe.paymentIntents.cancel(id);
      throw new Error(
        `${paymentIntent.amount}  ${order?.totalPrice} not equal`,
      );
    } else {
      const order = await prisma.order.findUnique({
        where: {
          paymentIntent: id,
        },
        include: {
          boxes: {
            include: {
              items: true,
            },
          },
          address: true,
        },
      });
      if (!order) throw new Error("order not found");
      const items = order?.boxes
        .map((box) => box.items)
        .flat() as Product[];

      await setOrderAsPayed(
        prisma,
        id,
        items.map((item) => item.id),
      );

      const htmlMessage = await htmlMessageTemplate(
        order,
        id,
        items,
        prisma,
      );

      await emailWrapper({
        email: env.EMAIL_USERNAME ?? "",
        subject: "New Order",
        htmlMessage,
        message: `New order with id ${order?.id} please enable html email to see full order`,
      });
    }
  },
};
