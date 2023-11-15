import { useState } from "react";
import LayoutShared from "~/components/shared/LayoutShared";
import {
  type BoxGroups,
  getBoxGroupFromSlug,
} from "~/utils/boxManagement";
import Image from "next/image";
import { capitalize, formatDollars } from "~/utils/lib";
import AddToCart from "~/components/Shop/ProductCard/AddToCartButtons";
import { ContactForm } from "../contact";
import {
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";

const ProductPage = ({
  boxGroup,
}: {
  boxGroup: (typeof BoxGroups)[number];
}) => {
  const [contactExpanded, setContactExpanded] =
    useState(false);
  const boxOptions = boxGroup.Boxes;
  const [selectedBox, setSelectedBox] = useState(
    boxOptions[0],
  );
  const boxItems = selectedBox?.items ?? [];
  const removeNewlinesRegex = /\n/g;
  const handleContactExpand = () => {
    setContactExpanded(!contactExpanded);
  };
  const itemsHaveVariants = boxGroup.Boxes.reduce(
    (acc, item) => {
      if (!acc) return acc;
      return item.variant ? true : false;
    },
    true,
  );

  return (
    <LayoutShared title={"St Isidore Ranch"}>
      <div className="mx-auto grid w-[1364px] max-w-fit justify-start justify-items-stretch gap-4  gap-y-16 px-8 lg:grid-cols-[2fr_3fr] lg:gap-24 lg:px-16">
        <div className="flex flex-col gap-y-3 text-2xl md:gap-y-6">
          <h2 className="whitespace-pre font-display text-2xl lg:text-4xl">
            {boxGroup.name}
          </h2>
          <p>{boxGroup.description}</p>{" "}
          {itemsHaveVariants && (
            <div>
              <div>Select box size</div>
              <form className="flex gap-6 ">
                {boxOptions.map((box) => {
                  if (!box.variant) return null;
                  return (
                    <div className="flex content-center gap-2">
                      <input
                        onClick={() => setSelectedBox(box)}
                        type="radio"
                        className="accent-primary-500"
                        id={box.slug}
                        name="size"
                        defaultChecked={
                          box.slug === selectedBox.slug
                        }
                        value={box.slug}
                      />
                      <label htmlFor={box.slug}>
                        {capitalize(box.variant)}
                      </label>
                    </div>
                  );
                })}
              </form>
            </div>
          )}
          <ul className="custom-list-bullet !list-disc">
            {boxItems.length
              ? boxItems.map((item) => {
                  return (
                    <li
                      key={item.name}
                      className="flex list-disc gap-2 py-2 font-display text-2xl"
                    >
                      <div className="font-sans">
                        <span>{item.quantity}</span>{" "}
                        <span className="whitespace-pre">
                          {item.name.replace(
                            removeNewlinesRegex,
                            " ",
                          )}
                        </span>
                      </div>
                    </li>
                  );
                })
              : "Call me at 519-703-6780 if you'd like a custom box :)"}
          </ul>
          <p className="">
            {formatDollars(selectedBox.totalPrice)}
          </p>
          <div>
            <p className="text-base">
              Since every animal is slightly different we
              can't guarantee exact weights, but we do
              guarantee that you'll get at least the weight
              you paid for over the entire bundle.
            </p>
          </div>
          <p className="whitespace-pre font-display text-2xl lg:text-4xl">
            Free Shipping!
          </p>
          {boxOptions.map((box) => {
            return (
              <div
                className={
                  box.slug === selectedBox.slug
                    ? "block"
                    : "hidden"
                }
              >
                <AddToCart
                  slug={box.slug}
                  hasMainPageStyles={true}
                />
              </div>
            );
          })}
          <button
            onClick={handleContactExpand}
            className={`flex w-full content-center items-center border-2 ${
              !contactExpanded
                ? " border-primary-500"
                : "border-transparent"
            } p-4 text-2xl font-semibold`}
          >
            Ask a Question
            {!contactExpanded ? (
              <ChevronDownIcon className="ml-auto h-6 w-6" />
            ) : (
              <ChevronUpIcon className="ml-auto h-6 w-6" />
            )}
          </button>
          {contactExpanded && (
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
          src={selectedBox.src}
        />
      </div>
    </LayoutShared>
  );
};
export default ProductPage;

export const getServerSideProps = ({
  params,
}: {
  params: { slug: string };
}) => {
  const { slug } = params;
  const boxGroup = getBoxGroupFromSlug(slug as string);
  return {
    props: {
      boxGroup: {
        ...boxGroup,
        Boxes: [
          ...boxGroup.Boxes.map((box) => {
            return { ...box };
          }),
        ],
      },
    },
  };
};
