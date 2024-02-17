import { type Box } from "@prisma/client";
import {
  type Item,
  getBoxFromSlug,
} from "~/utils/boxManagement";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { api } from "~/utils/api";
import { useCart } from "~/providers/cart";
import { formatDollars } from "~/utils/lib";

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
      slug: box.slug,
    });
  };
  return (
    <li
      key={box.title}
      className="flex gap-6 bg-backdrop-500 px-8 py-4"
    >
      <div className="w-full flex-col">
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-6">
            <span className="text-xl">{box.title}</span>
          </div>
          <button
            onClick={handleRemoveFronOrder}
            className="relative flex w-full flex-1 justify-end"
          >
            <XCircleIcon className="h-6 w-6 cursor-pointer justify-end justify-self-end" />
          </button>
        </div>
        <span>{formatDollars(box.totalPrice)}</span>
        {getBoxFromSlug(box.slug)?.items.map(
          (item: Item) => (
            <div className="whitespace-pre" key={item.name}>
              {item.quantity} {item.name}
            </div>
          ),
        )}
      </div>
    </li>
  );
};
export default BoxConfirm;
