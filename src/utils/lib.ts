export const formatDollars = (
  cents: number | undefined,
) => {
  if (!cents) return "$0.00";
  return `$${(cents / 100).toFixed(2)}`;
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
