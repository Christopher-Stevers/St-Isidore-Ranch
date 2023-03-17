import { ProductClass } from "~/typedefs/ProductClass";
import React, { useState } from "react";

import { api } from "~/utils/api";

interface AdminProductCardProps {
  productClass: ProductClass;
  refetch: () => void;
}
const AdminProductCard = ({ productClass, refetch }: AdminProductCardProps) => {
  const [localProductCount, updateLocalProductCount] = useState("");

  const { mutate: addProductsToClass } =
    api.product.addProductsToClass.useMutation({
      onSuccess: async () => {
        if (typeof refetch === "function") {
          refetch();
        }
      },
    });
  const handleAddProductsToClass = (productClass: ProductClass) => {
    addProductsToClass({
      productClassId: productClass.id,
      count: parseInt(localProductCount),
    });
  };
  const { mutate: removeProductClass } =
    api.productClass.removeProductClass.useMutation({
      onSuccess: async () => {
        if (typeof refetch === "function") {
          refetch();
        }
      },
    });

  const setLocalProductCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateLocalProductCount(e.target.value);
  };

  return (
    <>
      <div
        className="border-3 flex gap-4 rounded-sm border-green-500 bg-white p-4"
        key={productClass.id}
      >
        price of ProductClass "{productClass.price}" Name of ProductClass "
        {productClass.name}"{" "}
        <div>Number of Products in Class "{productClass.productsCount}"</div>
        <div>
          <div> Add products</div>
          <input
            onChange={setLocalProductCount}
            className=" h-4  bg-blue-500"
            type="number"
          />
          <button onClick={() => handleAddProductsToClass(productClass)}>
            Create Products
          </button>
        </div>
        <button
          onClick={() => removeProductClass({ id: productClass.id })}
          className="font-bold text-red-500"
        >
          x
        </button>
      </div>
    </>
  );
};
export default AdminProductCard;
