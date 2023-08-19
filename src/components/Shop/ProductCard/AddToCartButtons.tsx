import { type Item } from "~/utils/boxManagement";
import { api } from "~/utils/api";
import { useCart } from "~/providers/cart";
import Link from "next/link";

const AddToCart = ({
  items,
  title,
}: {
  items: Item[];
  title: string;
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
    <>
      {isInStock ? (
        <div className="flex w-full justify-between px-4">
          <button
            onClick={handleAddToCard}
            className="rounded bg-primary-500 py-2 px-4 font-semibold text-white hover:bg-black"
          >
            Add to Cart
          </button>
          <Link
            href="/checkout"
            className="flex items-center rounded bg-primary-500 py-2 px-4 font-semibold text-white hover:bg-black"
          >
            Checkout
          </Link>
        </div>
      ) : (
        <span className="py-2 px-4 font-semibold leading-loose text-black">
          Out of Stock
        </span>
      )}
    </>
  );
};

export default AddToCart;
