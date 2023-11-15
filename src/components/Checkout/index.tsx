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
import BTCPay from "../BtcPay";
import PayWithBubble from "./PayWithBubble";

const stripePromise = loadStripe(
  env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);
export const REVIEW = "REVIEW";
export const ADDRESS = "ADDRESS";
export const PAYMENT = "PAYMENT";

export const CARD = "CARD";
export const BTC = "BTC";

const Checkout = () => {
  const [paymentStep, setPaymentStep] = useState(PAYMENT);
  const [paymentType, setPaymentType] = useState(CARD);
  const [btcPaymentUrl, setBtcPaymentUrl] = useState<
    string | null
  >(null);
  const [cart] = useCart();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState("");
  const [stripePaymentIntentId, setStripePaymentIntentId] =
    useState<string | null>(null);
  const [btcPaymentIntentId, setBtcPaymentIntentId] =
    useState<string | null>(null);
  const currentMaxBreakpoint = useMediaQuery();
  const { mutate: createPaymentIntent } =
    api.stripe.createPaymentIntent.useMutation({
      onSuccess: (data) => {
        console.log(data);
        if (!data?.client_secret) return;
        setStripePaymentIntentId(data.id);
        setClientSecret(data.client_secret);
      },
    });
  const { mutate: createBtcPaymentIntent } =
    api.stripe.createBTCPayLighteningPaymentIntent.useMutation(
      {
        onSuccess: (data) => {
          setBtcPaymentIntentId(data.id);
          setBtcPaymentUrl(data.checkoutLink);
        },
      },
    );
  const { mutate: setOrderPaymentIntent } =
    api.stripe.setOrderPaymentIntent.useMutation({
      onSuccess: (data) => {
        console.log(data);
      },
    });

  useEffect(() => {
    switch (paymentType) {
      case CARD:
        if (
          cart?.id &&
          !clientSecret &&
          !stripePaymentIntentId
        ) {
          console.log("make payment intent");
          createPaymentIntent({ orderId: cart?.id ?? "" });
        } else if (cart?.id && stripePaymentIntentId) {
          setOrderPaymentIntent({
            orderId: cart?.id,
            paymentIntentId: stripePaymentIntentId,
          });
        }
      case BTC:
        if (cart?.id && !btcPaymentIntentId) {
          createBtcPaymentIntent({
            orderId: cart?.id ?? "",
          });
        } else if (cart?.id && btcPaymentIntentId) {
          console.log("happening");
          setOrderPaymentIntent({
            orderId: cart?.id,
            paymentIntentId: btcPaymentIntentId,
          });
        }
    }
  }, [
    cart?.id,
    paymentStep,
    paymentType,
    clientSecret,
    btcPaymentIntentId,
    createBtcPaymentIntent,
    createPaymentIntent,
  ]);

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
            <div className="flex flex-col gap-y-6">
              <div className="flex">
                <h3 className="justify between text-3xl font-semibold">
                  Purchase Information
                </h3>
              </div>
              <div className="flex gap-8">
                <PayWithBubble
                  title={"Credit Card"}
                  slug={CARD}
                  value={paymentType}
                  setValue={setPaymentType}
                />
                <PayWithBubble
                  title={"Bitcoin"}
                  slug={BTC}
                  src={"/bitcoin.png"}
                  value={paymentType}
                  setValue={setPaymentType}
                />
              </div>
              <CSSSwitch
                variable={paymentType}
                constants={CARD}
              >
                {clientSecret && (
                  <Elements
                    options={options}
                    stripe={stripePromise}
                  >
                    <OrderStripe />
                  </Elements>
                )}
              </CSSSwitch>
              <CSSSwitch
                variable={paymentType}
                constants={BTC}
              >
                {btcPaymentUrl && (
                  <BTCPay btcPaymentUrl={btcPaymentUrl} />
                )}
              </CSSSwitch>
            </div>
          </CSSSwitch>
        </div>
      </div>
    </LayoutShared>
  );
};

export default Checkout;
