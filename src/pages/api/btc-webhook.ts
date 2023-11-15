// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export type BtcPayServerWebhookRequestBody = {
  manuallyMarked: boolean;
  deliveryId: string;
  webhookId: string;
  originalDeliveryId: string;
  isRedelivery: boolean;
  type:
    | "InvoiceSettled"
    | "InvoiceCreated"
    | "InvoiceReceivedPayment"
    | "InvoiceProcessing"
    | "InvoiceExpired"
    | "InvoiceInvalid"
    | "InvoicePaymentSettled";
  timestamp: number;
  storeId: string;
  invoiceId: string;
};

import {
  type NextApiRequest,
  type NextApiResponse,
} from "next";
import crypto from "crypto";
import { btcPayPublicClient } from "~/components/BtcPay";
import btcEventHandlers from "~/server/helpers/btcEventHandlers";
import { env } from "~/env.mjs";

const headerSignatureMatchesWebhookKey = (
  sig: string,
  body: BtcPayServerWebhookRequestBody,
) => {
  const webhookKey = env.BTC_PAY_WEBHOOK_SECRET;
  if (!webhookKey) {
    return false;
  }

  // @TODO we'll probably need to create a map of storeId => webhook_btcpay_sig because each store has its own webhook key
  // sha256=HMAC256(UTF8(webhook's secret), body)
  const hmac = crypto.createHmac("sha256", webhookKey);
  const digest = Buffer.from(
    `sha256=${hmac
      .update(JSON.stringify(body))
      .digest("hex")}`,
    "utf8",
  );
  const checksum = Buffer.from(sig, "utf8");
  return checksum.length === digest.length;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { headers } = req;
    const data: BtcPayServerWebhookRequestBody = req.body;
    data.invoiceId = "EMrSMMcx9pSbVZ1MRUU9RM";
    const { invoiceId, storeId } = data;
    const btcPayPublic = await btcPayPublicClient(
      `https://btcpay.btc.aw/api/v1/stores/${storeId}/invoices/${invoiceId}`,
    );
    const amount = btcPayPublic.amount * 100;

    if (!data || !data.invoiceId || !data.storeId) {
      throw new Error(
        "api/webhooks/btc-pay-server: invalid data. no invoice ID",
      );
    }

    if (
      !headerSignatureMatchesWebhookKey(
        headers["btcpay-sig"] as string,
        data,
      )
    ) {
      throw new Error(
        "api/webhooks/btc-pay-server: invalid BTCPAY_SIG",
      );
    }
    const metadata = { amount };
    await btcEventHandlers.defaultHandler(
      invoiceId,
      metadata,
    );
    await btcEventHandlers.handlePaymentIntentSucceeded(
      invoiceId,
      amount,
    );
    res.status(200).send("ok");
  } catch (error) {
    console.log(error);
    // @TODO log to error logger
    res.status(500).send(error);
  }
};
