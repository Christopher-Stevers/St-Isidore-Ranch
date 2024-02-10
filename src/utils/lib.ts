export const formatDollars = (
  cents: number | undefined,
) => {
  if (!cents) return "$0.00";
  return `$${(cents / 100).toFixed(2)}`;
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getPriceWithDiscount = (
  order:
    | {
        coupon: { multiplier: number } | null;
        totalPrice: number;
      }
    | null
    | undefined,
) => {
  const percentageDiscount = order?.coupon?.multiplier ?? 1;
  const initialPrice = order?.totalPrice ?? 0;
  return initialPrice * percentageDiscount;
};
