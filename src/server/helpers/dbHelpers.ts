import { type PrismaClient } from "@prisma/client";

export const clearOrderByPaymentId = async (
  prisma: PrismaClient,
  paymentIntentId: string,
) => {
  await prisma.product.updateMany({
    where: {
      Box: {
        Order: {
          paymentIntent: paymentIntentId,
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
        paymentIntent: paymentIntentId,
      },
    },
  });
  await prisma.order.delete({
    where: {
      paymentIntent: paymentIntentId,
    },
  });
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

export const refundOrder = (
  _prisma: PrismaClient,
  paymentIntent: string,
) => {
  console.log("refundOrder, ", paymentIntent);
  // if the order price has issues
};
export const setOrderAsPayed = async (
  prisma: PrismaClient,
  paymentIntentId: string,
  itemIds: string[],
) => {
  await prisma.order.update({
    where: {
      paymentIntent: paymentIntentId,
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
