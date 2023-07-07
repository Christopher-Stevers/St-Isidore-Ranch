import { useCart } from "~/providers/cart";
import BoxConfirm from "./BoxConfirm";
import Link from "next/link";
const OrderView = () => {
  const [order] = useCart();
  return (
    <div className="flex flex-col gap-y-6">
      <h3 className="text-3xl font-semibold">
        Review your order
      </h3>
      {order?.boxes.length ? (
        <ul className="w-2/3 flex-col gap-8 py-8">
          {order?.boxes.map((box) => (
            <BoxConfirm key={box.id} box={box} />
          ))}
        </ul>
      ) : (
        <p>
          Oops, looks like you didn't add anything to your
          cart - go back and add some items in the{" "}
          <Link href="/shop">store</Link>.
        </p>
      )}
      <div className="text-xl font-semibold">
        Total ${order?.totalPrice}
      </div>
    </div>
  );
};

export default OrderView;
