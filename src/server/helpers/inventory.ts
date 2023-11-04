import { type Item } from "~/utils/boxManagement";
import { type PrismaClient } from "@prisma/client";

export const checkInStock = async (
  input: Item[],
  countOnly: boolean,
  prisma: PrismaClient,
) => {
  const neededProducts = [];
  for (const element of input) {
    const elementWithoutNewLine = element.name.replace(
      /\n/g,
      " ",
    );
    if (countOnly) {
      const productsCount = await prisma.product.count({
        take: element.quantity,
        where: {
          sold: false,
          productClass: {
            name: elementWithoutNewLine,
          },
          Box: null,
        },
      });
      if (productsCount < element.quantity) {
        return { status: false, neededProducts: null };
      }
    } else {
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
  }
  const neededProductsFinal = countOnly
    ? null
    : neededProducts.flat();
  return {
    neededProducts: neededProductsFinal,
    status: true,
  };
};
