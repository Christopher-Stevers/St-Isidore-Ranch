import { type Dispatch, type SetStateAction } from "react";
import Image from "next/image";

const PayWithBubble = ({
  title,
  slug,
  src,
  value,
  setValue,
}: {
  title: string;
  slug: string;
  src?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) => {
  const handleSelect = () => {
    setValue(slug);
  };
  return (
    <button
      onChange={handleSelect}
      className="flex w-full max-w-[300px] items-center gap-4 rounded-md border-2 border-primary-500 bg-backdrop-500 px-4 py-2 text-lg font-bold text-form"
    >
      <input
        checked={value === slug}
        id={slug}
        type="radio"
      />
      <label className="flex" htmlFor={slug}>
        Pay With {title}
        {src && (
          <Image
            className="flex-1"
            alt="payment-img"
            src={src}
            width="48"
            height="24"
          />
        )}
      </label>
    </button>
  );
};
export default PayWithBubble;
