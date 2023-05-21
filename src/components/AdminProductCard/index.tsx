import { type ProductClass } from "~/typedefs/ProductClass";
import React, { useState } from "react";
import Image from "next/image";
import {
  PencilIcon,
  XMarkIcon,
  CheckIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import TogglePlusMinus from "~/components/base/TogglePlusMinus.tsx";

import { api } from "~/utils/api";

interface AdminProductCardProps {
  productClass: ProductClass;
  refetch: () => void;
}
const AdminProductCard = ({ productClass, refetch }: AdminProductCardProps) => {
  const [localProductCount, updateLocalProductCount] = useState("");

  const { mutate: addProductsToClass } =
    api.product.addProductsToClass.useMutation({
      onSuccess: () => {
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
      onSuccess: () => {
        if (typeof refetch === "function") {
          refetch();
        }
      },
    });

  const setLocalProductCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateLocalProductCount(e.target.value);
  };
  const openEdit = () => {
    setEditable(!editable);
  };
  return (
    <>
      <div
        className="bg flex gap-4 rounded-sm  bg-black p-4 text-white"
        key={productClass.id}
      >
        <div className="ring-2">
          <Image alt="no src" src={productClass.src} width={100} height={100} />
        </div>
        <div>Number of Products in Class "{productClass.productsCount}"</div>
        <div>
          <TogglePlusMinus />
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
          className="h-min"
        >
          <TrashIcon className="h-5 w-5 fill-white" />
        </button>
      </div>
    </>
  );
};
export default AdminProductCard;
