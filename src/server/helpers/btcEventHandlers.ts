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
  defaultHandler: async (id: string, metadata: object) => {
    await prisma.btcPayEvent.create({
      data: {
        id,
        metadata,
      },
    });
  },

  handlePaymentIntentSucceeded: async (
    invoiceId: string,
    amount: number,
  ) => {
    const order = await prisma.order.findUnique({
      where: {
        paymentIntent: invoiceId,
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
    if (amount !== order?.totalPrice) {
      throw new Error(
        `${amount}  ${order?.totalPrice} not equal`,
      );
    } else {
      const order = await prisma.order.findUnique({
        where: {
          paymentIntent: invoiceId,
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
        invoiceId,
        items.map((item) => item.id),
      );

      const htmlMessage = await htmlMessageTemplate(
        order,
        invoiceId,
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
