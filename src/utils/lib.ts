export const formatDollars = (
  cents: number | undefined,
) => {
  if (!cents) return "$0.00";
  return `$${(cents / 100).toFixed(2)}`;
};
