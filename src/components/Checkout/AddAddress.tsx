import AddressFieldInput from "./AddressFieldInput";
const AddAddress = () => {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-3xl font-semibold ">
        Shipping Address
      </h3>
      <AddressFieldInput
        name="Address line 1"
        field="address1"
      />
    </div>
  );
};
export default AddAddress;
