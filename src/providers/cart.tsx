import React, {
  type ReactNode,
  createContext,
  useReducer,
} from "react";
import { type Box } from "@prisma/client";
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
interface CartItem {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  totalPrice: number;
  paid: boolean;
  boxes: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    totalPrice: number;
    boxSize: number;
    orderId: string;
  }[];
}

type CartState = CartItem[];

type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: string };

const CartContext = createContext<
  [CartState, React.Dispatch<CartAction>]
>({} as [CartState, React.Dispatch<CartAction>]);
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
  state: CartState,
  action: CartAction,
): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, action.payload];
    case "REMOVE_FROM_CART":
      return state.filter(
        (item) => item.id !== action.payload,
      );
    default:
      return state;
  }
};

const CartProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [state, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={[state, dispatch]}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
