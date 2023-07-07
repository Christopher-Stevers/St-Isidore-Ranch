import LayoutSecondary from "~/layouts/LayoutSecondary";
import Order from "~/components/Checkout/Order";
const Checkout = () => {
  return (
    <LayoutSecondary title={"Checkout"}>
      <Order />
    </LayoutSecondary>
  );
};

export default Checkout;
