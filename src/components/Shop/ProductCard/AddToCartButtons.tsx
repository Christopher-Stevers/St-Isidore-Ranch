import { type Item } from "~/utils/boxManagement";
import { api } from "~/utils/api";
import { useCart } from "~/providers/cart";
import Link from "next/link";

const AddToCart = ({
  items,
  title,
  hasMainPageStyles,
}: {
  items: Item[];
  title: string;
  hasMainPageStyles?: boolean;
}) => {
  const [cartState, cartDispatch] = useCart();
  const { data: isInStock } =
    api.product.getInStock.useQuery(items);
  const { mutate: addToCart } =
    api.order.addToOrder.useMutation({
      onSuccess: (data) => {
        cartDispatch({
          type: "UPDATE_CART",
          payload: data,
        });
      },
    });

  const handleAddToCard = () => {
    addToCart({ title, orderId: cartState?.id });
  };
  const darkButton =
    "bg-primary-500 py-2 px-4 text-center font-semibold leading-loose text-white";
  const lightButton =
    "w-full py-2 text-center font-semibold leading-loose text-black";
  return (
    <div className="w-full self-center">
      {isInStock ? (
        <div
          className={`flex w-full justify-between gap-y-8 ${
            hasMainPageStyles ? "flex-col" : "flex-row"
          }`}
        >
          <button
            onClick={handleAddToCard}
            className={darkButton}
          >
            Add to Cart
          </button>
          <Link
            href="/checkout"
            className={
              hasMainPageStyles
                ? lightButton.concat(
                    " border-2 border-primary-500",
                  )
                : darkButton
            }
          >
            Checkout
          </Link>
        </div>
      ) : (
        <div
          className={
            !hasMainPageStyles
              ? "w-full py-2 text-center font-semibold leading-loose text-black"
              : darkButton
          }
        >
          Out of Stock
        </div>
      )}
    </div>
  );
};

export default AddToCart;
