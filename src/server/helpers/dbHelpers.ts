import { type PrismaClient } from "@prisma/client";
import emailWrapper from "./emailWrapper";
import { env } from "~/env.mjs";

export const clearOrderByPaymentId = async (
  prisma: PrismaClient,
  paymentIntentId: string,
) => {
  await prisma.product.updateMany({
    where: {
      Box: {
        Order: {
          paymentIntent: { has: paymentIntentId },
        },
      },
    },
    data: {
      sold: false,
      boxId: null,
    },
  });
  if (paymentIntentId) {
    // delete order and boxes
    await prisma.box.deleteMany({
      where: {
        Order: {
          paymentIntent: { has: paymentIntentId },
        },
      },
    });

    await prisma.order.deleteMany({
      where: {
        paymentIntent: { has: paymentIntentId },
      },
    });
  }
};
export const clearOrderById = async (
  prisma: PrismaClient,
  id: string,
) => {
  await prisma.product.updateMany({
    where: {
      Box: {
        Order: {
          id,
        },
      },
    },
    data: {
      sold: false,
      boxId: null,
    },
  });
  // delete order and boxes
  await prisma.box.deleteMany({
    where: {
      Order: {
        id,
      },
    },
  });
  await prisma.order.delete({
    where: {
      id,
    },
  });
};

export const refundOrder = async (
  _prisma: PrismaClient,
  paymentIntent: string,
) => {
  await emailWrapper({
    email: env.EMAIL_USERNAME ?? "",
    subject: "Refund",
    htmlMessage: `New order with PaymentIntentid ${paymentIntent} hit an error`,
    message: `New order with paymentIntentid ${paymentIntent} hit an error`,
  });

  // if the order price has issues
};

export const setOrderAsPayed = async (
  prisma: PrismaClient,
  paymentIntentId: string,
  itemIds: string[],
) => {
  const order = await prisma.order.findFirst({
    where: {
      paymentIntent: { has: paymentIntentId },
    },
  });
  await prisma.order.update({
    where: {
      id: order?.id as string,
    },
    data: {
      paid: true,
    },
  });
  await prisma.product.updateMany({
    where: {
      id: {
        in: itemIds,
      },
    },
    data: {
      sold: true,
    },
  });
};
