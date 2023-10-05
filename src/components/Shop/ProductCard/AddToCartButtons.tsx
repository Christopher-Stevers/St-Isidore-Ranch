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

  return (
    <div className="self-end">
      {isInStock ? (
        <div className="flex w-full justify-between px-4">
          <button
            onClick={handleAddToCard}
            className={
              hasMainPageStyles
                ? "py-2 px-4 font-semibold leading-loose text-black"
                : "bg-primary-500 py-2 px-4 text-center font-semibold leading-loose text-white"
            }
          >
            Add to Cart
          </button>
          <Link
            href="/checkout"
            className={
              "bg-primary-500 py-2 px-4 text-center font-semibold leading-loose text-white"
            }
          >
            Checkout
          </Link>
        </div>
      ) : (
        <span
          className={
            !hasMainPageStyles
              ? "py-2 px-4 font-semibold leading-loose text-black"
              : "bg-primary-500 py-2 px-4 text-center font-semibold leading-loose text-white"
          }
        >
          Out of Stock
        </span>
      )}
    </div>
  );
};

export default AddToCart;
