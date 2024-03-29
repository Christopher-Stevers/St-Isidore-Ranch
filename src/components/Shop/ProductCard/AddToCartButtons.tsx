import { api } from "~/utils/api";
import { useOrder } from "~/providers/OrderProvider";
import { useRouter } from "next/router";
import { useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

export const OutOfStock = ({
  hasMainPageStyles,
}: {
  hasMainPageStyles?: boolean;
}) => {
  const darkButton =
    "bg-primary-500 py-2 px-4 text-center font-semibold leading-loose text-white";
  const lightButton =
    "w-full py-2 text-center font-semibold leading-loose text-black";
  return (
    <div
      className={
        !hasMainPageStyles ? lightButton : darkButton
      }
    >
      Out of Stock
    </div>
  );
};
export const StockLoading = ({
  isLoading,
  children,
}: {
  hasMainPageStyles?: boolean;
  isLoading: boolean;
  children: React.ReactNode;
}) => {
  return (
    <>
      {isLoading ? (
        <div className="flex h-[2em] w-full items-center justify-center">
          <ArrowPathIcon className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <> {children}</>
      )}
    </>
  );
};

const AddToCart = ({
  slug,
  hasMainPageStyles,
}: {
  slug: string;
  hasMainPageStyles?: boolean;
}) => {
  const router = useRouter();
  const [checkingOut, setCheckingOut] = useState(false);
  const { order, updateOrder } = useOrder();
  const [justAdded, setJustAdded] = useState(false);
  const {
    isLoading: queryLoading,
    data: isInStock,
    refetch,
  } = api.product.getInStock.useQuery(slug);
  const { isLoading: mutationLoading, mutate: addToCart } =
    api.order.addToOrder.useMutation({
      onSuccess: async (data) => {
        refetch().catch(console.error);
        setJustAdded(true);
        updateOrder({
          type: "UPDATE_ORDER",
          payload: data,
        });
        refetch().catch(console.error);
        if (checkingOut) {
          await router.push("/checkout");
        }
      },
    });

  const handleAddToCard = () => {
    addToCart({ slug, orderId: order?.id });
  };
  const handleCheckout = () => {
    setCheckingOut(true);

    addToCart({
      slug,
      orderId: order?.id,
    });
  };
  const isLoading = queryLoading || mutationLoading;
  const darkButton =
    "bg-primary-500 py-2 px-4 text-center font-semibold leading-loose text-white";
  const lightButton =
    "w-full py-2 text-center font-semibold leading-loose text-black";
  return (
    <div className="w-full self-center">
      <div
        className={`flex w-full justify-between gap-y-8 ${
          hasMainPageStyles ? "flex-col" : "flex-row"
        }`}
      >
        {isInStock || isLoading ? (
          <button
            disabled={isLoading}
            onClick={handleCheckout}
            className={
              hasMainPageStyles
                ? lightButton.concat(
                    " border-2 border-primary-500",
                  )
                : darkButton.concat(" w-32")
            }
          >
            <StockLoading
              hasMainPageStyles={hasMainPageStyles}
              isLoading={isLoading && !justAdded}
            >
              <span>Order Now</span>
            </StockLoading>
          </button>
        ) : (
          <></>
        )}
        {isInStock || isLoading ? (
          <button
            disabled={isLoading}
            onClick={handleAddToCard}
            className={
              hasMainPageStyles
                ? darkButton
                : darkButton.concat(" w-32")
            }
          >
            <StockLoading
              hasMainPageStyles={hasMainPageStyles}
              isLoading={isLoading}
            >
              <span>Add to Cart</span>
            </StockLoading>
          </button>
        ) : (
          <OutOfStock
            hasMainPageStyles={hasMainPageStyles}
          />
        )}
      </div>
    </div>
  );
};

export default AddToCart;
