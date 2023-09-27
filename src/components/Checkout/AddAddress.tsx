import React, { type SetStateAction } from "react";
import Link from "next/link";
import AddressFieldInput from "./AddressFieldInput";
import { PAYMENT } from "./index";
import CheckoutConfirmButton from "./CheckoutConfirmButton";
const AddAddress = ({
  setPaymentStep,
}: {
  setPaymentStep: React.Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="flex flex-col gap-6 pb-6">
      <h3 className="text-3xl font-semibold ">
        Shipping Address
      </h3>

      <p>
        Please note that we only ship to Perth County,
        London, and Waterloo at this time. If you live
        outside of that, please{" "}
        <Link href="/contact">contact me</Link> and I'll do
        my best to accomodate you.
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

      <CheckoutConfirmButton
        onClick={() => {
          setPaymentStep(PAYMENT);
        }}
      >
        Save
      </CheckoutConfirmButton>
    </div>
  );
};
export default AddAddress;
