import { type NextApiResponse } from "next";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import type Stripe from "stripe";
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
  req: Request,
  res: NextApiResponse,
) {
  const headers = req.headers as unknown as {
    [key: string]: string;
  };
  const sig = headers["stripe-signature"];
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      await (await req.blob()).text(),
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
          if (paymentIntent.amount === order?.totalPrice) {
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

            const getProductClassOfItemById = async (
              id: string,
            ) => {
              const productClass =
                await prisma.productClass.findUnique({
                  where: {
                    id: id,
                  },
                });
              return productClass?.name;
            };
            const htmlMessage = `<p>New order with id ${
              order?.id
            } and payment intent ${id} has been payed for total of ${
              order.totalPrice
            }
               </p>
               <p>Order is for boxes:</p>
               <ul>
               
               ${order?.boxes?.map((box) => {
                 return `<li> ${box.title} </li>`;
               })}
               </ul>
               <p>user's email is ${
                 paymentIntent.receipt_email
               }</p>
         <p>contents are</p>
         
         <ul>
         
         ${await Promise.all(
           items?.map(async (item) => {
             return `<li> ${await getProductClassOfItemById(
               item.productClassId,
             )} </li>`;
           }),
         )}
         </ul>
         <p>
                address is:
                <p>${order.address?.address1}</p><p>${
              order.address?.address2
            }</p>
                 <p>${order.address?.postalCode}</p><p>${
              order.address?.city
            }</p><p>${order.address?.name}</p>
                .`;
            await emailWrapper({
              email: "christopher.stevers1@gmail.com",
              subject: "New Order",
              htmlMessage,
              message: `New order with id ${order?.id} please enable html email to see full order`,
            });
          } else {
            // if the order price has issues
            await stripe.refunds.create({
              payment_intent: id,
            });
            await prisma.order.update({
              where: {
                paymentIntent: id,
              },
              data: {
                paid: false,
                paymentIntent: null,
              },
            });
            await stripe.paymentIntents.cancel(id);
            throw new Error(
              `${paymentIntent.amount}  ${order?.totalPrice} not equal`,
            );
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
}
