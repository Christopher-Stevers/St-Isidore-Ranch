import React from "react";
import { api } from "~/utils/api";
import AddProductClassCard from "./AddProductClass";

import AdminProductCard from "~/components/AdminProductCard";
import { type ProductClass } from "~/typedefs/ProductClass";
const AdminMutations: React.FC = () => {
  const {
    data: productClasses,
    isLoading,
    refetch,
  } = api.productClass.getProductClasses.useQuery(undefined, {
    networkMode: "always",
  });
  const refetchProductClasses = () => {
    refetch()
      .then(() => console.log("completed"))
      .catch((e) => console.error(e));
  };
  console.log(productClasses, "my product classes", isLoading);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      Product Class Admin {JSON.stringify(productClasses)}
      <div>
        <AddProductClassCard refetchProductClasses={refetchProductClasses} />
        {productClasses?.map((productClass: ProductClass) => (
          <AdminProductCard
            key={productClass.id}
            refetch={refetchProductClasses}
            productClass={productClass}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminMutations;
