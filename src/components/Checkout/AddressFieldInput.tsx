import { useEffect, useState } from "react";
import useDebounce from "~/hooks/useDebounce";
import { useCart } from "~/providers/cart";
import { api } from "~/utils/api";

const AddressFieldInput = ({
  name,
  field,
}: {
  name: string;
  field: string;
}) => {
  const [order] = useCart();
  const [value, setValue] = useState("");
  const { mutate: updateAddress } =
    api.address.upsertAddress.useMutation({});
  const addressValueDebounced = useDebounce(value, 500);
  const handleUpdateAddress = () => {
    updateAddress({
      orderId: order?.id ?? "",
      [field]: addressValueDebounced,
    });
  };
  useEffect(() => {
    if (addressValueDebounced) {
      handleUpdateAddress();
    }
  }, [addressValueDebounced]);
  return (
    <div>
      <label className="block text-form">{name}</label>
      <input
        onChange={(e) => setValue(e.target.value)}
        className="block w-full rounded-md border  p-3 text-sm text-form outline-none focus-visible:ring-transparent"
        id={field}
      />
    </div>
  );
};
export default AddressFieldInput;
