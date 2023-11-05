import {
  useQuery,
  useMutation,
} from "@tanstack/react-query";
import { useState } from "react";
import { env } from "~/env.mjs";

const cryptoCode = "BTC";

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
  const cryptoCode = "BTC";
  const storeId = env.NEXT_PUBLIC_STORE_ID;

  const handleSubmit = () => {
    localStorage.removeItem("orderId");
  };

  const handleCreateInvoice = () => {};

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
