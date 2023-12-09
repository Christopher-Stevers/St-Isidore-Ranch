// pages/api/deleteOldBoxes.js
import { PrismaClient } from "@prisma/client";
import {
  type NextApiRequest,
  type NextApiResponse,
} from "next";
import { clearOrderById } from "~/server/helpers/dbHelpers";

const prisma = new PrismaClient();

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const oneWeekAgo = new Date();

    // get all orders from over a week ago
    const oldOrders = await prisma.order.findMany({
      where: {
        createdAt: {
          lt: oneWeekAgo,
        },
      },
    });
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
