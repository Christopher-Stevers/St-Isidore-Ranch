import AddressFieldInput from "./AddressFieldInput";
const AddAddress = () => {
  return (
    <div className="flex flex-col gap-6 pb-6">
      <h3 className="text-3xl font-semibold ">
        Shipping Address
      </h3>

      <p>
        Please note that we only ship within Ontario at this
        time.
      </p>
      <AddressFieldInput
        name="Address line 1"
        field="address1"
      />
      <AddressFieldInput
        name="Address line 2"
        field="address2"
      />
      <AddressFieldInput name="City" field="city" />
      <AddressFieldInput
        name="Postal Code"
        field="postalCode"
      />
      <AddressFieldInput name="Name" field="name" />
    </div>
  );
};
export default AddAddress;
