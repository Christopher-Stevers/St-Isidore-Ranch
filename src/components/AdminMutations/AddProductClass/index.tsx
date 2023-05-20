import Input from "~/components/base/Input";
import React, { useState } from "react";
import { api } from "~/utils/api";

const AddProductClassCard = ({
  refetchProductClasses,
}: {
  refetchProductClasses: () => void;
}) => {
  const [localProductClass, updateProductClass] = useState("");
  const [localProductPic, updateProductPic] = useState("");

  const { mutate: addProductClass } =
    api.productClass.addProductClass.useMutation(
      {
        onSuccess: () => {
          console.log("success");
          if (typeof refetchProductClasses === "function") {
            refetchProductClasses();
          }
        },
      },
      {
        networkMode: true,
      },
    );

  const handleAddProductClass = () => {
    const result = addProductClass({
      name: localProductClass,
      src: localProductPic,
    });
    console.log(result, "my result");
    console.log("exec");
  };

  return (
    <div className="flex w-60 flex-col content-center  gap-4 bg-primary-500 p-4 text-center ">
      <h3 className="text-white"> Add New Product Class</h3>
      <Input placeholder={"Name"} onChange={updateProductClass} />
      <Input placeholder="Image src" onChange={updateProductPic} />
      <button className="bg-white" onClick={handleAddProductClass}>
        Add Product Class
      </button>
    </div>
  );
};
export default AddProductClassCard;
