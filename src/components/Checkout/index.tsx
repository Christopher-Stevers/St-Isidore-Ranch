import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";

import { useCart } from "~/providers/cart";
import CSSSwitch from "~/components/base/CSSSwitch";
import { api } from "~/utils/api";
import { env } from "~/env.mjs";

import LayoutShared from "~/components/shared/LayoutShared";
import OrderStripe from "./OrderStripe";
import AddAddress from "./AddAddress";
import {
  type StripeElementsOptions,
  loadStripe,
} from "@stripe/stripe-js";
import OrderView from "./OrderView";
import BackLink from "./BackLink";
import { useRouter } from "next/router";
import useMediaQuery, {
  mediaQueryCompare,
} from "~/hooks/useMediaQuery";
const stripePromise = loadStripe(
  env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);
export const REVIEW = "REVIEW";
export const ADDRESS = "ADDRESS";
export const PAYMENT = "PAYMENT";

const Checkout = () => {
  const [paymentStep, setPaymentStep] = useState(REVIEW);
  const [cart] = useCart();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState("");
  const currentMaxBreakpoint = useMediaQuery();
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
  const handleStepChange = (step: string) => {
    switch (step) {
      case REVIEW:
        router.push("/shop").catch(console.error);
        break;
      case ADDRESS:
        setPaymentStep(REVIEW);
        break;
      case PAYMENT: {
        if (mediaQueryCompare(currentMaxBreakpoint, "lg")) {
          setPaymentStep(REVIEW);
        } else setPaymentStep(ADDRESS);
      }
    }
  };

  return (
    <LayoutShared title={"Checkout"}>
      {paymentStep}
      <div className="px-8 lg:px-32">
        <BackLink>
          <button
            onClick={() => {
              handleStepChange(paymentStep);
            }}
          >
            <CSSSwitch
              variable={paymentStep}
              constants={REVIEW}
            >
              Back to store
            </CSSSwitch>
            <CSSSwitch
              variable={paymentStep}
              constants={ADDRESS}
            >
              Edit Order
            </CSSSwitch>

            <CSSSwitch
              variable={paymentStep}
              constants={PAYMENT}
            >
              Edit Address
            </CSSSwitch>
          </button>
        </BackLink>
        <div className=" grid-cols-2 lg:grid">
          <CSSSwitch
            variable={paymentStep}
            constants={REVIEW}
          >
            <OrderView setPaymentStep={setPaymentStep} />
          </CSSSwitch>

          <CSSSwitch
            variable={paymentStep}
            constants={
              mediaQueryCompare(currentMaxBreakpoint, "lg")
                ? [REVIEW, ADDRESS]
                : ADDRESS
            }
          >
            <AddAddress setPaymentStep={setPaymentStep} />
          </CSSSwitch>

          <CSSSwitch
            variable={paymentStep}
            constants={PAYMENT}
          >
            {clientSecret && (
              <div className="flex flex-col gap-y-6">
                <h3 className="text-3xl font-semibold ">
                  Purchase Information
                </h3>
                <Elements
                  options={options}
                  stripe={stripePromise}
                >
                  <OrderStripe />
                </Elements>
              </div>
            )}
          </CSSSwitch>
        </div>
      </div>
    </LayoutShared>
  );
};

export default Checkout;
