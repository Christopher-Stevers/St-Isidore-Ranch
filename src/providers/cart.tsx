import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import React, {
  type ReactNode,
  createContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import Link from "next/link";
import { api } from "~/utils/api";
import { type Address } from "@prisma/client";
// cart item is typeof this
/*{
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
  };
  */
type Order =
  | {
      id: string;
      createdAt: Date;
      updatedAt: Date | null;
      totalPrice: number;
      paid: boolean;
      address: Address | null;
      boxes: {
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        totalPrice: number;
        boxSize: number;
        orderId: string | null;
        title: string;
      }[];
    }
  | null
  | undefined;

type CartAction = { type: "UPDATE_CART"; payload: Order };

const CartContext = createContext<
  [Order | null, React.Dispatch<CartAction>]
>({} as [Order | null, React.Dispatch<CartAction>]);

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error(
      "useCart must be used within a CartProvider",
    );
  }
  return context;
};
const cartReducer = (
  state: Order,
  action: CartAction,
): Order => {
  switch (action.type) {
    case "UPDATE_CART":
      return action.payload;
    default:
      return state;
  }
};

const CartProvider = ({
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
              type: "UPDATE_CART",
              payload: data,
            });
          }
        },
      },
    );
  const [state, dispatch] = useReducer(cartReducer, order);
  useEffect(() => {
    const localOrderId = localStorage.getItem("orderId");
    if (localOrderId) {
      setLocalOrderId(localOrderId);
      refetchOrder().catch(console.error);
    }
  }, []);

  useEffect(() => {
    if (state?.id) {
      localStorage.setItem("orderId", state?.id);
    }
  }, [state?.id]);
  return (
    <CartContext.Provider value={[state, dispatch]}>
      <Link
        href="/checkout"
        className="fixed bottom-0 right-0"
      >
        {state?.boxes.length}{" "}
        <ShoppingCartIcon className="h-10 w-10" />
      </Link>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
