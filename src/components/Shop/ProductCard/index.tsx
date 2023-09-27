import Image from "next/image";
import { type Item } from "~/utils/boxManagement";
import AddToCart from "./AddToCartButtons";
export type ProductCardProps = {
  title: string;
  src: string;
  items: Item[];
  totalPrice: number;
};
const ProductCard = ({
  title,
  items,
  src,
  totalPrice,
}: ProductCardProps) => {
  return (
    <div className="grid-rows grid w-80 grid-rows-[209px_48px_48px_auto_48px] gap-x-16 gap-y-4 bg-backdrop-500 pb-8">
      <div className="flex items-center justify-between px-4">
        <h3 className="whitespace-pre text-3xl font-semibold">
          {title}
        </h3>
      </div>
      <div className="rounded-full px-2 text-right text-2xl">
        {totalPrice !== 0 && `$${totalPrice}`}
      </div>
      <div className="w-full px-4 font-text text-xl">
        {items.length
          ? items.map((item) => {
              return (
                <div key={item.name} className="flex gap-2">
                  <span>{item.quantity}</span>
                  <span className="whitespace-pre">
                    {item.name}
                  </span>
                </div>
              );
            })
          : "Call me at 519-703-6780 if you'd like a custom box :)"}
      </div>
      <div className={` row-start-1 `}>
        <Image
          alt="picture of product"
          className="h-[180px] w-[320px]  "
          width="480"
          height="279"
          src={src}
        />
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
