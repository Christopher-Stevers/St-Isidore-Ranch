import { useEffect } from "react";
import { env } from "~/env.mjs";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import AddressFieldInput from "~/components/Checkout/AddressFieldInput";

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

const BTCPay = ({ invoiceId }: { invoiceId: string }) => {
  const router = useRouter();
  const { data: invoice } =
    api.stripe.getBtcPayInvoice.useQuery({ invoiceId });
  const btcPaymentUrl = invoice?.checkoutLink;
  useEffect(() => {
    if (invoice?.status === "Settled") {
      router.push("/success").catch((err) => {
        console.log(err);
      });
    }
  }, [invoice]);

  return (
    <div className="flex w-full flex-col gap-6">
      <div>
        If you'd like to recieve email confirmation of your
        please fill in your email below.
      </div>
      <AddressFieldInput name="Email" field="email" />
      {btcPaymentUrl && (
        <iframe
          src={btcPaymentUrl}
          className="h-[1000px] w-full"
        />
      )}
    </div>
  );
};
export default BTCPay;
