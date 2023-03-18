import { type ProductClass } from "@prisma/client";
export interface ProductClass extends ProductClass {
  productsCount: number;
}
