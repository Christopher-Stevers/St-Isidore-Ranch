const CheckoutConfirmButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className="text-sans col-start-2 my-8 w-1/2 rounded-lg bg-primary-700 px-4 py-2 text-white"
    >
      {children}
    </button>
  );
};

export default CheckoutConfirmButton;
