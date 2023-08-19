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
  /* const mockedOrder = {
    id: "64a495db328c2b21142da7d9",
    createdAt: "2023-07-04T21:57:47.631Z",
    updatedAt: "2023-07-04T21:57:47.628Z",
    totalPrice: 120,
    paid: false,
    boxes: [
      {
        id: "64a495db328c2b21142da7da",
        createdAt: "2023-07-04T21:57:47.631Z",
        updatedAt: null,
        totalPrice: 120,
        boxSize: 0,
        orderId: "64a495db328c2b21142da7d9",
      },
    ],
  };*/
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
