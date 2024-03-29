// pages/api/deleteOldBoxes.js
import { PrismaClient } from "@prisma/client";
import {
  type NextApiRequest,
  type NextApiResponse,
} from "next";
import { clearOrderById } from "~/server/helpers/dbHelpers";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const oneDayAgo = new Date();
    // get query params from the request
    const { days, hours } = req.query;
    if (typeof days === "string") {
      oneDayAgo.setDate(
        oneDayAgo.getDate() - parseInt(days),
      );
    }
    if (typeof hours === "string") {
      oneDayAgo.setHours(
        oneDayAgo.getHours() - parseInt(hours),
      );
    }
    // get all orders from over a week ago
    const oldOrders = await prisma.order.findMany({});
    for (const order of oldOrders) {
      await clearOrderById(prisma, order.id);
    }

    res.status(200).json({
      message: `Deleted ${oldOrders.length} orders.`,
    });
  } catch (error) {
    console.error("Error deleting boxes:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
