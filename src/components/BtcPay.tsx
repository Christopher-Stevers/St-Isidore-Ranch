import { env } from "~/env.mjs";

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
  console.log(url);
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
  btcPaymentUrl,
}: {
  btcPaymentUrl: string;
}) => {
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
