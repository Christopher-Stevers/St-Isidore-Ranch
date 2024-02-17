import { useEffect } from "react";
import { env } from "~/env.mjs";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import AddressFieldInput from "~/components/Checkout/AddressFieldInput";
import { BTC, PAYMENT } from "./Checkout";
import { useOrder } from "~/providers/OrderProvider";

export const btcPayPublicClient = async (
  url: string,
  method: "GET" | "POST" = "GET",
  body?: object,
  optionalHeaders?: Record<string, string>,
) => {
  const headers = optionalHeaders ?? {};
  const optionalBody = body
    ? { body: JSON.stringify(body) }
    : {};
  const rawResponse = await fetch(url, {
    headers: {
      Authorization: `token ${env.NEXT_PUBLIC_BTCPAY_KEY}`,
      ...headers,
    },
    method,
    ...optionalBody,
  });

  return rawResponse.json();
};

const BTCPay = ({
  paymentStep,
  paymentType,
  
}: {
  paymentStep: string;
  paymentType: string;
}) => {
  const router = useRouter();
  const {order, refetchOrder } = useOrder();
  const ONE_SECONDS = 1000;
  const { data: invoice } =
    api.payments.getBtcPayInvoice.useQuery(
      { orderId: order?.id },
      { refetchInterval: ONE_SECONDS },
    );
  const btcPaymentUrl = invoice?.checkoutLink;
  useEffect(() => {
    if (invoice?.status === "Settled") {
      refetchOrder();
      router.push("/success").catch((err) => {
        console.log(err);
      });
    }
  }, [invoice, refetchOrder, router]);

  return (
    <div className="flex w-full flex-col gap-6">
      <div>
        If you{`'`}d like to recieve email confirmation of your
        order please fill in your email below.
      </div>
      <AddressFieldInput name="Email" field="email" />
      {btcPaymentUrl &&
        paymentStep === PAYMENT &&
        paymentType === BTC && (
          <iframe
          title="btcpay portal"
            src={btcPaymentUrl}
            className="h-[1000px] w-full"
          />
        )}
    </div>
  );
};
export default BTCPay;
