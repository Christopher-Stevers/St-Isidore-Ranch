import { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { type StripePaymentElementOptions } from "@stripe/stripe-js";

const OrderStripe = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(
      window.location.search,
    ).get("payment_intent_client_secret");

    if (!clientSecret) {
      return;
    }

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }) => {
        switch (paymentIntent?.status) {
          case "succeeded":
            setMessage("Payment succeeded!");
            break;
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage(
              "Your payment was not successful, please try again.",
            );
            break;
          default:
            setMessage("Something went wrong.");
            break;
        }
      })
      .catch(console.error);
  }, [stripe]);

  const handleSubmit = () => {
    localStorage.removeItem("orderId");
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "http://localhost:3000",
        },
      })
      .then(({ error }) => {
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (
          error.type === "card_error" ||
          error.type === "validation_error"
        ) {
          setMessage(error.message ?? "");
        } else {
          setMessage("An unexpected error occurred.");
        }
      })
      .catch(console.error);

    setIsLoading(false);
  };

  const paymentElementOptions: StripePaymentElementOptions =
    {
      layout: "tabs",
    };
  return (
    <form
      id="payment-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.value.email)}
      />
      <PaymentElement
        id="payment-element"
        options={paymentElementOptions}
      />
      <button
        className="text-sans my-8 w-1/2 rounded-lg bg-primary-700 px-4 py-2 text-white"
        disabled={isLoading || !stripe || !elements}
        onClick={handleSubmit}
        id="submit"
      >
        <span id="button-text ">
          {isLoading ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Order Now"
          )}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};
export default OrderStripe;
