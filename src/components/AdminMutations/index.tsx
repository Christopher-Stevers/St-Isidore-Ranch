import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import AdminProductCard from "~/components/AdminProductCard";
import { ProductClass } from "~/typedefs/ProductClass";
const AdminMutations: React.FC = () => {
  const { data: productClasses, refetch: refetchProductClasses } =
    api.productClass.getProductClasses.useQuery();

  const [localProductClass, updateProductClass] = useState("");
  const [localProductPrice, updateProductPrice] = useState("");
  const { data: sessionData } = useSession();

  const { mutate: addProductClass } =
    api.productClass.addProductClass.useMutation({
      onSuccess: async () => {
        if (typeof refetchProductClasses === "function") {
          refetchProductClasses();
        }
      },
    });

  const handleAddProductClass = () => {
    addProductClass({
      text: localProductClass,
      price: parseInt(localProductPrice),
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <div>
        {productClasses?.map((productClass: ProductClass) => (
          <AdminProductCard
            refetch={refetchProductClasses}
            productClass={productClass}
          />
        ))}
      </div>
      <input onChange={(e) => updateProductPrice(e.target.value)} />
      <input onChange={(e) => updateProductClass(e.target.value)} />
      <button onClick={handleAddProductClass}>update productClass</button>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

export default AdminMutations;
