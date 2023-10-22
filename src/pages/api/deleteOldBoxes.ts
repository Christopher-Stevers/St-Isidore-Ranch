// pages/api/deleteOldBoxes.js
import { PrismaClient } from "@prisma/client";
import {
  type NextApiRequest,
  type NextApiResponse,
} from "next";

const prisma = new PrismaClient();

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const deletedBoxes = await prisma.box.deleteMany({
      where: {
        updatedAt: {
          lt: oneWeekAgo,
        },
      },
    });

    res.status(200).json({
      message: `Deleted ${deletedBoxes.count} boxes.`,
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
