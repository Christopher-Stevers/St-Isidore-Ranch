import Image from "next/image"
export type ProductCardProps = {
  direction: "left" | "right";
  title: string;
  text: string;

  src: string;
};
const ProductCard = ({ direction, title, text,  src }: ProductCardProps) => {
  const colStart = direction === "left" ? "xl:col-start-1" : "xl:col-start-2";

  return (
    <div className="grid-rows grid w-80 grid-rows-[209px_48px_auto_48px] gap-x-16 gap-y-4 xl:w-full xl:w-min xl:grid-cols-[480px_480px] xl:grid-rows-[48px_auto_48px]">
      <h3 className="text-3xl font-semibold">{title}</h3>
      <p className="w-full font-text text-xl">{text} </p>
     
      <div className={`${colStart} row-start-1 xl:row-end-4`}>
        <Image
        alt="picture of product"
          className="h-[180px] w-[320px] xl:h-[270px] xl:w-[480px]"
          width="480"
          height="279"
          src={src}
       />
      </div>
    </div>
  );
};

export default ProductCard;
