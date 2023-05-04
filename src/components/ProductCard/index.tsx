import Image from "next/image"
import type { Product } from "@prisma/client";
export type ProductCardProps = {
  title: string;
  text: string;
  contents: Product[],
  src: string;
};
const ProductCard = ({ title, contents, src }: ProductCardProps) => {

  return (
    <div className="grid-rows grid w-80 grid-rows-[209px_48px_auto_48px] gap-x-16 gap-y-4">
      <h3 className="text-3xl font-semibold">{title}</h3>
      <p className="w-full font-text text-xl">
        {contents.map((product) => {
          return <div className="flex gap-2">
            <span>{product.quantity}</span>
            {product.productClass}</div>
        })}
      </p>

      <div className={` row-start-1 `}>
        <Image
          alt="picture of product"
          className="h-[180px] w-[320px]  "
          width="480"
          height="279"
          src={src}
        />
      </div>
    </div>
  );
};

export default ProductCard;
