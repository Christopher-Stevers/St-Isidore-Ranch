import { type PropsWithChildren } from "react";
import Image from "next/image";
import Link from "next/link";

const Headline = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex w-full content-center items-center justify-between gap-8 p-4">
      <Link href="/">
        {" "}
        <Image
          alt="products"
          src="/logo.png"
          width={100}
          height={100}
        />
      </Link>
      <div className=" font-display text-6xl ">
        {children}
      </div>
      <Link href="/">
        {" "}
        <Image
          alt="products"
          src="/logo.png"
          width={100}
          height={100}
        />
      </Link>
    </div>
  );
};
export default Headline;
