import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import OrderStripe from "./OrderStripe";
import { useCart } from "~/providers/cart";
import AddAddress from "./AddAddress";
import { api } from "~/utils/api";
import { env } from "~/env.mjs";
import {
  type StripeElementsOptions,
  loadStripe,
} from "@stripe/stripe-js";
import OrderView from "./OrderView";
const stripePromise = loadStripe(
  env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

const Order = () => {
  const [cart] = useCart();
  const [clientSecret, setClientSecret] = useState("");
  const { mutate } =
    api.stripe.createPaymentIntent.useMutation({
      onSuccess: (data) => {
        if (!data?.client_secret) return;
        setClientSecret(data.client_secret);
      },
    });

  useEffect(() => {
    if (cart?.id) {
      mutate({ orderId: cart?.id ?? "" });
    }
  }, [cart?.id]);

  const appearance: StripeElementsOptions["appearance"] = {
    rules: {
      ".Input:focus": {
        boxShadow: "none",
        borderColor: "#E5E7EB",
      },
    },
    theme: "stripe",
  };
  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <div className="px-32">
      <div className="grid grid-cols-2">
        <OrderView />
        <div>
          <AddAddress />
          {clientSecret && (
            <Elements
              options={options}
              stripe={stripePromise}
            >
              <OrderStripe />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};
export default Order;
