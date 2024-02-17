import { prisma } from "~/server/db";
import emailWrapper from "~/server/helpers/emailWrapper";
import {
  refundOrder,
  setOrderAsPayed,
} from "~/server/helpers/dbHelpers";
import { htmlMessageTemplate } from "./htmlMessageTemplate";
import { env } from "process";
import { getPriceWithDiscount } from "~/utils/lib";

const btcEventHandler = {
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
    const order = await prisma.order.findFirst({
      where: {
        btcPayId: { has: invoiceId },
      },
      include: {
        coupon: true,
        boxes: {
          include: {
            items: true,
          },
        },
        address: true,
      },
    });

    if (
      amount !== getPriceWithDiscount(order) &&
      env.NODE_ENV !== "development"
    ) {
      await refundOrder(prisma, invoiceId);
      if (order && invoiceId) {
        throw new Error(
          `${invoiceId}  ${order?.totalPrice} not equal`,
        );
      }
    } else {
      const order = await prisma.order.findFirst({
        where: {
          btcPayId: { has: invoiceId },
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
        .flat();

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
        htmlMessage: htmlMessage?.concat(
          "payed with bitcoin",
        ),
        message: `New order with id ${order?.id} please enable html email to see full order`,
      });
    }
  },
};

export default btcEventHandler;
