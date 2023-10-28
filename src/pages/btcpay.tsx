import {
  useQuery,
  useMutation,
} from "@tanstack/react-query";
import { useState } from "react";
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

const BTCPay = () => {
  const cryptoCode = "BTC";
  const [invoiceId, setInvoiceId] = useState<string>("");
  const storeId = env.NEXT_PUBLIC_STORE_ID;
  const { data: invoices, refetch } = useQuery(
    ["invoices", cryptoCode],
    () =>
      btcPayPublicClient(
        `https://btcpay.btc.aw/api/v1/stores/${storeId}/lightning/${cryptoCode}/invoices/${invoiceId}`,
      ),
  );
  const { mutate: createInvoice } = useMutation(
    ["invoices", cryptoCode],
    () =>
      btcPayPublicClient(
        `https://btcpay.btc.aw/api/v1/stores/${storeId}/lightning/${cryptoCode}/invoices`,
        "POST",
        {
          amount: "20",
          description: "string",
          descriptionHashOnly: false,
          expiry: 90,
          privateRouteHints: false,
        },
        { "Content-Type": "application/json" },
      ),
    {
      onSuccess: (data) => {
        console.log(data);
        setInvoiceId(data.id);
        refetch().catch(console.error);
      },
    },
  );
  const handleCreateInvoice = () => {
    createInvoice();
  };

  return (
    <div>
      {invoices?.amount}

      <button onClick={handleCreateInvoice}>
        Create invoice
      </button>
    </div>
  );
};
export default BTCPay;
