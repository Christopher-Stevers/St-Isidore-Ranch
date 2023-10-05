import Image from "next/image";
import { type Item } from "~/utils/boxManagement";
import AddToCart from "./AddToCartButtons";
import { formatDollars } from "~/utils/lib";
import Link from "next/link";
export type ProductCardProps = {
  title: string;
  src: string;
  items: Item[];
  totalPrice: number;
  description?: string;
};
const ProductCard = ({
  title,
  items,
  src,
  totalPrice,
  description,
}: ProductCardProps) => {
  return (
    <div className="grid w-80 grid-rows-[180px_36px] gap-x-16  gap-y-4 bg-backdrop-500 px-4 pb-8">
      <Link
        className="-mx-4 underline"
        href={`/box/${title}`}
      >
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
          {title}
        </h3>
      </div>
      <div className="text-lg">
        <div className=" w-full">{description}</div>
        <Link className="underline" href={`/box/${title}`}>
          more info
        </Link>
      </div>

      <div className="rounded-full text-left text-2xl">
        {!totalPrice ? "" : formatDollars(totalPrice)}
      </div>
      <div className="flex justify-center font-semibold text-slate-500">
        {totalPrice !== 0 && (
          <AddToCart items={items} title={title} />
        )}
      </div>
    </div>
  );
};

export default ProductCard;
