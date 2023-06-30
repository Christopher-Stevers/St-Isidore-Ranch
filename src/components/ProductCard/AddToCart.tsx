import { type Item } from "~/utils/boxTemplates";
import { api } from "~/utils/api";

const AddToCart = ({
  items,
  title,
}: {
  items: Item[];
  title: string;
}) => {
  const { data: isInStock } =
    api.product.getInStock.useQuery(items);
  const { mutate: addToCart } =
    api.order.addToOrder.useMutation({
      onSuccess: (data) => {
        console.log(data);
      },
    });

  return (
    <>
      {isInStock ? (
        <button
          onClick={() =>
            addToCart({ orderId: "as", title })
          }
          className="rounded bg-primary-500 py-2 px-4 font-semibold text-white hover:bg-black"
          type="button"
        >
          Add to Cart
        </button>
      ) : (
        <span className="  py-2 px-4 font-semibold leading-loose text-black">
          Out of Stock
        </span>
      )}
    </>
  );
};

export default AddToCart;
