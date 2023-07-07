import { type Box } from "@prisma/client";
import { getBoxFromClass } from "~/utils/boxTemplates";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { api } from "~/utils/api";
import { useCart } from "~/providers/cart";

const BoxConfirm = ({ box }: { box: Box }) => {
  const [, cartDispatch] = useCart();
  const { mutate: removeItem } =
    api.order.removeItemFromOrder.useMutation({
      onSuccess: (data) => {
        cartDispatch({
          type: "UPDATE_CART",
          payload: data,
        });
      },
    });

  const handleRemoveFronOrder = () => {
    removeItem({
      boxId: box.id,
      orderId: box.orderId,
      boxTitle: box.title,
    });
  };
  return (
    <li
      key={box.title}
      className="flex gap-6 bg-backdrop-500 px-8 py-4"
    >
      <div className="w-60">
        <span className="text-xl">{box.title}</span>
        {getBoxFromClass(box.title).items.map((item) => (
          <div key={item.name}>
            {item.quantity} {item.name}
          </div>
        ))}
      </div>
      <span>${box.totalPrice}</span>
      <button
        onClick={handleRemoveFronOrder}
        className="relative flex w-full flex-1"
      >
        <XCircleIcon className="absolute right-0 h-6 w-6 flex-1 cursor-pointer justify-self-end" />
      </button>
    </li>
  );
};
export default BoxConfirm;
