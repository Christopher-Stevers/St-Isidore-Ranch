import LayoutShared from "~/components/shared/LayoutShared";
import Order from "~/components/Checkout/Order";
const Checkout = () => {
  return (
    <LayoutShared title={"Checkout"}>
      <Order />
    </LayoutShared>
  );
};

export default Checkout;
