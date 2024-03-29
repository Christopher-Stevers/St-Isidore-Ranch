import Input from "~/components/base/Input";
import React, { useState } from "react";
import { api } from "~/utils/api";

const AddProductClassCard = ({
  refetchProductClasses,
}: {
  refetchProductClasses: () => void;
}) => {
  const [localProductClass, updateProductClass] =
    useState("");
  const { mutate: addProductClass } =
    api.productClass.addProductClass.useMutation({
      onSuccess: () => {
        if (typeof refetchProductClasses === "function") {
          refetchProductClasses();
        }
      },
    });

  const handleAddProductClass = () => {
    addProductClass({
      name: localProductClass,
      src: "",
    });
  };

  return (
    <div className="flex w-60 flex-col content-center  gap-4 bg-primary-500 p-4 text-center ">
      <h3 className="text-white"> Add New Product Class</h3>
      <Input
        placeholder={"Name"}
        onChange={updateProductClass}
      />
      <button
        className="bg-white"
        onClick={handleAddProductClass}
      >
        Add Product Class
      </button>
    </div>
  );
};
export default AddProductClassCard;
