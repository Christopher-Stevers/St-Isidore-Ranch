import Stripe from "stripe";
import { env } from "~/env.mjs";
const stripeClient = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});
export default stripeClient;
