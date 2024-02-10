import Image from "next/image";
import AddToCart from "./AddToCartButtons";
import { formatDollars } from "~/utils/lib";
import { type BoxGroupType } from "~/utils/boxManagement";
import Link from "next/link";

const ProductCard = ({
  boxGroup,
}: {
  boxGroup?: BoxGroupType;
}) => {
  const renderboxGroup = boxGroup ?? {
    name: "Custom Box",
    description:
      "Looking for that perfect box of steaks for your special occasion? Or maybe you want to load up on organ meats? Call me at 519-703-6780 if you'd like a custom box :)",
    slug: "/contact",
    priceMax: null,
    priceMin: null,
    src: "/telephone.jpg",
    isContact: true,
    Boxes: [],
  };
  const { name, description, src } = renderboxGroup;
  const isContact = renderboxGroup.slug === "/contact";
  const slug = isContact
    ? renderboxGroup.slug
    : `/box-options/${renderboxGroup.slug}`;
  const Boxes = renderboxGroup.Boxes ?? [];
  const primaryBox = Boxes[0];
  const totalPrice = primaryBox?.totalPrice ?? 0;

  return (
    <div className="grid w-80 grid-rows-[180px_36px] gap-x-16  gap-y-4 bg-backdrop-500 px-4 pb-8">
      <Link className="-mx-4 underline" href={slug}>
        <Image
          alt="picture of product"
          className="h-[180px] w-[320px]  "
          width="320"
          height="180"
          src={src}
        />
      </Link>

      <div className="flex items-center justify-between">
        <h3 className="whitespace-pre text-3xl font-semibold">
          {name}
        </h3>
      </div>
      <div className="text-lg">
        <div className=" w-full">{description}</div>

        {!isContact && (
          <Link className="underline" href={`${slug}`}>
            more info
          </Link>
        )}
      </div>

      <div className="rounded-full text-left text-2xl">
        {primaryBox?.totalPrice
          ? formatDollars(totalPrice)
          : "Call for pricing"}
      </div>
      <div className="flex justify-center font-semibold text-slate-500">
        {primaryBox && (
          <AddToCart
            slug={renderboxGroup.Boxes[0]?.slug ?? ""}
          />
        )}
      </div>
    </div>
  );
};

export default ProductCard;
