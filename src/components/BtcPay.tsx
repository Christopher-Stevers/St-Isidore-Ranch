import { env } from "~/env.mjs";
import { api } from "~/utils/api";

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
  const { data: invoice } =
    api.stripe.getBtcPayInvoice.useQuery({ invoiceId });
  const btcPaymentUrl = invoice
    ? `${env.NEXT_PUBLIC_BTCPAY_URL}/i/${invoice.id}`
    : null;

  return (
    <div className="w-full">
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
