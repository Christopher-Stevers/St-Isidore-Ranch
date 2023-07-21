import {
  type NextApiRequest,
  type NextApiResponse,
} from "next";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import type Stripe from "stripe";
import { buffer } from "micro";
import stripe from "../../server/stripe/client";
import emailWrapper from "~/server/helpers/emailWrapper";

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf,
        sig as string,
        webhookSecret,
      );

      // Handle the event
      switch (event.type) {
        case "payment_intent.payment_failed":
          {
            const paymentIntent = event.data
              .object as Stripe.PaymentIntent;
            // free up products
            await prisma.product.updateMany({
              where: {
                Box: {
                  Order: {
                    paymentIntent: paymentIntent.id,
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
                  paymentIntent: paymentIntent.id,
                },
              },
            });
            await prisma.order.delete({
              where: {
                paymentIntent: paymentIntent.id,
              },
            });
          }
          // Used to provision services after the trial has ended.
          // The status of the invoice will show up as paid. Store the status in your database to reference when a user accesses your service to avoid hitting rate limits.

          break;
        case "payment_intent.succeeded":
          {
            const paymentIntent = event.data
              .object as Stripe.PaymentIntent;
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
            if (
              paymentIntent.amount === order?.totalPrice
            ) {
              const items = order?.boxes
                .map((box) => box.items)
                .flat();

              await prisma.order.update({
                where: {
                  paymentIntent: id,
                },
                data: {
                  paid: true,
                },
              });
              await prisma.product.updateMany({
                where: {
                  id: {
                    in: items?.map((item) => item.id),
                  },
                },
                data: {
                  sold: true,
                },
              });
              console.log("sending email");
              await emailWrapper({
                email: "christopher.stevers1@gmail.com",
                subject: "New Order",
                htmlMessage: `<p>New order with id ${
                  order?.id
                } and payment intent ${id} has been payed for, total issues
               </p><p> ${JSON.stringify(order)}
         </p>
         <p>   contents are ${JSON.stringify(items)} </p><p>
                address is ${JSON.stringify(order.address)}
                .`,
                message: `New order with id ${
                  order?.id
                } and payment intent ${id} has been payed for, total is  
              
              ${JSON.stringify(order)}
              contents are ${JSON.stringify(items)}
              address is ${JSON.stringify(order.address)}
              .</p>`,
              });
            } else {
              // if the order price has issues
              await stripe.refunds.create({
                payment_intent: id,
              });
            }
          }
          break;
        default:
        // Unexpected event type
      }

      // record the event in the database
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

      res.json({ received: true });
    } catch (err) {
      res.status(400).send(err);
      return;
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
