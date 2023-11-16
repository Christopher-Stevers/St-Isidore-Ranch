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
        Currently we deliver anywhere in the GTA as well as
        a wide swath of southern-central Ontario. There is a
        full map of our delivery area{" "}
        <Link
          className="text-primary-500 underline"
          href="/blog/how-we-deliver"
          target="_blank"
        >
          here
        </Link>
        . If you live in Ontario you probably within our
        delivery area. If not, please{" "}
        <Link
          className="text-primary-500 underline"
          href="/contact"
        >
          contact me
        </Link>{" "}
        and I'll do my best to accomodate you.
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
