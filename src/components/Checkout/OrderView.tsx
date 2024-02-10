import { useCart } from "~/providers/cart";
import BoxConfirm from "./BoxConfirm";
import Link from "next/link";
import React, {
  useState,
  type SetStateAction,
  type ChangeEvent,
} from "react";
import CheckoutConfirmButton from "./CheckoutConfirmButton";
import { ADDRESS } from ".";
import useMediaQuery, {
  mediaQueryCompare,
} from "~/hooks/useMediaQuery";
import { api } from "~/utils/api";
import {
  formatDollars,
  getPriceWithDiscount,
} from "~/utils/lib";
const OrderView = ({
  setPaymentStep,
}: {
  setPaymentStep: React.Dispatch<SetStateAction<string>>;
}) => {
  const [order, cartDispatch] = useCart();
  const [couponValue, setCouponValue] = useState(
    order?.coupon?.code ?? "",
  );
  const { mutate } =
    api.order.linkCouponCodeToOrder.useMutation({
      onSuccess: (data) => {
        cartDispatch({
          type: "UPDATE_CART",
          payload: data,
        });
      },
    });
  const linkToOrder = (couponId: string) => {
    const orderId = order?.id;
    if (orderId && couponId) {
      mutate({ couponId, orderId: orderId });
    }
  };
  api.coupon.get.useQuery(couponValue, {
    onSuccess: (data) => {
      if (data) {
        linkToOrder(data.id);
      }
    },
  });
  const currentMaxBreakpoint = useMediaQuery();
  const handleCoupon = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setCouponValue(e.target.value);
  };
  return (
    <div className="flex flex-col gap-y-6">
      <h3 className="text-3xl font-semibold">
        Review your order
      </h3>
      {order?.boxes.length ? (
        <ul className="w-full flex-col gap-8 py-8 lg:w-3/4">
          {order?.boxes.map((box) => (
            <BoxConfirm key={box.id} box={box} />
          ))}
        </ul>
      ) : (
        <p>
          Oops, looks like you didn{"'"}t add anything to your
          cart - go back and add some items in the{" "}
          <Link
            className="text-primary-500 underline"
            href="/shop"
          >
            store
          </Link>
          .
        </p>
      )}
      <div>
        <label
          className="block text-sm text-form"
          htmlFor="coupon"
        >
          Coupon code ( optional )
        </label>
        <input
          className="block w-full rounded-md border  p-3 text-sm text-form outline-none focus-visible:ring-transparent lg:w-3/4"
          id="coupon"
          value={couponValue}
          onChange={handleCoupon}
        />
      </div>
      <div className="text-xl font-semibold">
        Total {formatDollars(getPriceWithDiscount(order))}
      </div>

      {!mediaQueryCompare(currentMaxBreakpoint, "lg") && (
        <CheckoutConfirmButton
          onClick={() => {
            setPaymentStep(ADDRESS);
          }}
        >
          Confirm
        </CheckoutConfirmButton>
      )}
    </div>
  );
};

export default OrderView;
