import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import React, {
  type ReactNode,
  createContext,
  useReducer,
  useState,
  useEffect,
  useMemo,
} from "react";
import Link from "next/link";
import { api } from "~/utils/api";
import { type Address } from "@prisma/client";

type Order =
  | {
      id: string;
      createdAt: Date;
      updatedAt: Date | null;
      totalPrice: number;
      paid: boolean;
      address: Address | null;
      paymentIntent: string[] | null;
      btcPayId: string[] | null;
      coupon: {
        multiplier: number;
        code: string;
      } | null;
      boxes: {
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        totalPrice: number;
        boxSize: number;
        orderId: string | null;
        title: string;
        variant: string | null;
        slug: string;
      }[];
    }
  | null
  | undefined;

type OrderAction = { type: "UPDATE_ORDER"; payload: Order };
type OrderContextType = {
  order: Order | null;
  updateOrder: React.Dispatch<OrderAction>;
  refetchOrder: () => void;
};
const OrderContext = createContext<OrderContextType>(
  {} as OrderContextType,
);

export const useOrder = () => {
  const context = React.useContext(OrderContext);
  if (!context) {
    throw new Error(
      "useOrder must be used within a OrderProvider",
    );
  }
  return context;
};
const orderReducer = (
  state: Order,
  action: OrderAction,
): Order => {
  if (action.type === "UPDATE_ORDER") {
    return action.payload;
  } else return state;
};

const OrderProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [localOrderId, setLocalOrderId] = useState<
    string | null
  >(null);
  const { data: order, refetch: refetchOrder } =
    api.order.getOrder.useQuery(
      {
        id: localOrderId,
      },
      {
        onSuccess: (data) => {
          if (data) {
            dispatch({
              type: "UPDATE_ORDER",
              payload: data,
            });
          }
          if (!data) {
            localStorage.removeItem("orderId");
          }
        },
      },
    );

  const [state, dispatch] = useReducer(orderReducer, order);
  useEffect(() => {
    const localOrderId = localStorage.getItem("orderId");
    if (localOrderId) {
      console.log("setting local order id", localOrderId);
      setLocalOrderId(localOrderId);
      refetchOrder().catch(console.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const orderContext = useMemo(() => {
    return {
      order: state,
      updateOrder: dispatch,
      refetchOrder,
    };
  }, [state, dispatch, refetchOrder]);

  return (
    <OrderContext.Provider value={orderContext}>
      <Link
        href="/checkout"
        className="fixed bottom-6 right-6 rounded-full border-4 border-primary-500  bg-backdrop-700 p-3 text-primary-500"
      >
        <div className="absolute inset-x-7 top-2 bg-backdrop-700 font-sans font-bold">
          {state?.boxes.length}
        </div>
        <ShoppingCartIcon className="h-10 w-10" />
      </Link>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
