import { type ProductClass } from "~/typedefs/ProductClass";
import React, { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import TogglePlusMinus from "~/components/base/TogglePlusMinus";

import { api } from "~/utils/api";
import EditableDiv from "../AdminMutations/AddProductClass/EditableDiv";
import EditButton from "../base/EditButton";

interface AdminProductCardProps {
  productClass: ProductClass;
  refetch: () => void;
}
const AdminProductCard = ({
  productClass,
  refetch,
}: AdminProductCardProps) => {
  const { data: availableProducts } =
    api.productClass.getAvailableProductsOfClass.useQuery({
      id: productClass.id,
    });
  const [localProductCount, updateLocalProductCount] =
    useState("");
  const editableState = useState(false);
  const [editable, setEditable] = editableState;
  const productNameState = useState(productClass.name);
  const [productName] = productNameState;
  const mutationOpt = {
    onSuccess: () => {
      if (typeof refetch === "function") {
        refetch();
      }
    },
  };
  const inputStyle = " rounded-xl bg-white text-black";
  const addDirState = useState("");
  const [addDir] = addDirState;
  const { mutate: updateNameMut } =
    api.productClass.updateProductClass.useMutation(
      mutationOpt,
    );

  const { mutate: addProductsToClass } =
    api.product.addProductsToClass.useMutation(mutationOpt);
  const handleAddProductsToClass = () => {
    const signMultiplier = addDir === "Add" ? 1 : -1;

    addProductsToClass({
      productClassId: productClass.id,
      count: parseInt(localProductCount) * signMultiplier,
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

  const updateProductClassName = () => {
    if (editable) {
      updateNameMut({
        id: productClass.id,
        name: productName,
      });
      setEditable(false);
    } else {
      setEditable(true);
    }
  };
  return (
    <>
      <div
        className="bg flex gap-4 rounded-sm  bg-black p-4 text-white"
        key={productClass.id}
      >
        <div className="flex h-min gap-2">
          <div>{availableProducts}</div>
          <EditableDiv
            className="w-40 rounded-full"
            editable={editable}
            divState={productNameState}
          />
          <EditButton
            editableState={[
              editable,
              updateProductClassName,
            ]}
          />{" "}
          in stock
          <TogglePlusMinus
            toggleState={addDirState}
            wrapperClass="border-2 w-min px-2 h-min  rounded-lg"
            items={[{ name: "Add" }, { name: "Subtract" }]}
          />
          <input
            onChange={(e) =>
              updateLocalProductCount(e.target.value)
            }
            className={inputStyle}
          />
          <button
            className={inputStyle}
            onClick={handleAddProductsToClass}
          >
            Submit Inventory Adjustment
          </button>
          <button
            onClick={() =>
              removeProductClass({ id: productClass.id })
            }
            className="h-min"
          >
            <TrashIcon className="h-5 w-5 fill-white" />
          </button>
        </div>
      </div>
    </>
  );
};
export default AdminProductCard;
