import { type Item } from "~/utils/boxManagement";
import { type PrismaClient } from "@prisma/client";

export const checkInStock = async (
  input: Item[],
  prisma: PrismaClient,
) => {
  const neededProducts = [];
  for (const element of input) {
    const elementWithoutNewLine = element.name.replace(
      /\n/g,
      " ",
    );
    const products = await prisma.product.findMany({
      take: element.quantity,
      where: {
        sold: false,
        productClass: {
          name: elementWithoutNewLine,
        },
        Box: null,
      },
    });
    if (products.length < element.quantity) {
      return { status: false, neededProducts: [] };
    }

    neededProducts.push(products);
  }

  return {
    neededProducts: neededProducts.flat(),
    status: true,
  };
};
