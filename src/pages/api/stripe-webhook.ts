import { type NextApiResponse } from "next";
import { env } from "~/env.mjs";
import type Stripe from "stripe";
import stripe from "../../server/stripe/client";
import stripeEventHandlers from "~/server/helpers/stripeEventHandlers";
import { type NextRequest } from "next/server";
import getRawBody from "raw-body";
import { type Readable } from "stream";

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};
const stripeWebhookHandler = async function (
  req: Readable & NextRequest,
  res: NextApiResponse,
) {
  const headers = req.headers as unknown as {
    [key: string]: string;
  };
  const rawBody = getRawBody(req);
  try {
    const sig = headers["stripe-signature"];

    const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

    const buffer = await rawBody;
    const event = stripe.webhooks.constructEvent(
      buffer,
      sig as string,
      webhookSecret,
    );
    await stripeEventHandlers.defaultHandler(event);
    const paymentIntent = event.data
      .object as Stripe.Event.Data.Object;

    // Handle the event
    switch (event.type) {
      case "payment_intent.payment_failed": {
        await stripeEventHandlers.handlePaymentIntentPaymentFailed(
          paymentIntent as Stripe.PaymentIntent,
        );
        break;
      }
      // Used to provision services after the trial has ended.
      // The status of the invoice will show up as paid. Store the status in your database to reference when a user accesses your service to avoid hitting rate limits.

      case "payment_intent.succeeded": {
        await stripeEventHandlers.handlePaymentIntentSucceeded(
          paymentIntent as Stripe.PaymentIntent,
        );
        break;
      }
      case "charge.succeeded":
        {
          await stripeEventHandlers.handleChargeSucceeded(
            paymentIntent as Stripe.Charge,
          );
        }
        break;
      // Unexpected event type
    }

    // record the event in the database
    res.json({ received: true });
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
    return;
  }
};

export default stripeWebhookHandler;
