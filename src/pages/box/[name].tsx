import { useState } from "react";
import { useRouter } from "next/router";
import LayoutShared from "~/components/shared/LayoutShared";
import { getBoxFromClass } from "~/utils/boxManagement";
import Image from "next/image";
import { formatDollars } from "~/utils/lib";
import AddToCart from "~/components/Shop/ProductCard/AddToCartButtons";
import { ContactForm } from "../contact";
import {
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";

const ProductPage = () => {
  const router = useRouter();
  const [contactExpanded, setContactExpanded] =
    useState(false);
  const { name } = router.query;
  const box = getBoxFromClass(name as string);
  const boxItems = box?.items ?? [];
  const removeNewlinesRegex = /\n/g;
  const handleContactExpand = () => {
    setContactExpanded(!contactExpanded);
  };

  return (
    <LayoutShared title={"St Isidore Ranch"}>
      <div className="mx-auto grid w-[1364px] max-w-fit justify-start justify-items-stretch gap-4  gap-y-16 px-8 lg:grid-cols-[2fr_3fr] lg:gap-24 lg:px-16">
        <div className="flex flex-col gap-y-3 text-2xl md:gap-y-6">
          <h2 className="font-display text-2xl lg:text-4xl">
            {box.title}
          </h2>
          <p className="">
            {formatDollars(box.totalPrice)}
          </p>
          <p>Free Shipping!</p>
          <AddToCart title={box.title} items={box.items} />
          <p>{box.description}</p>
          {boxItems.length
            ? boxItems.map((item) => {
                return (
                  <div
                    key={item.name}
                    className="flex gap-2 text-lg"
                  >
                    <span>{item.quantity}</span>
                    <span className="whitespace-pre">
                      {item.name.replace(
                        removeNewlinesRegex,
                        " ",
                      )}
                    </span>
                  </div>
                );
              })
            : "Call me at 519-703-6780 if you'd like a custom box :)"}

          <button
            onClick={handleContactExpand}
            className={`flex w-full content-center items-center border-2 ${
              contactExpanded
                ? " border-primary-500"
                : "border-transparent"
            } p-2 text-3xl font-semibold`}
          >
            Ask a Question
            {contactExpanded ? (
              <ChevronDownIcon className="ml-auto h-6 w-6" />
            ) : (
              <ChevronUpIcon className="ml-auto h-6 w-6" />
            )}
          </button>
          {!contactExpanded && (
            <ContactForm
              toggleOpen={handleContactExpand}
              title="Ask a Question"
            />
          )}
        </div>
        <Image
          alt="picture of product"
          width="720"
          height="405"
          src={box.src}
        />
      </div>
    </LayoutShared>
  );
};
export default ProductPage;
