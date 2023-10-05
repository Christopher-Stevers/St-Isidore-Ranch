import { type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
const LayoutShared = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="py-4 pb-32">
      <div className="flex w-full content-center items-center justify-between border-y-4 border-primary-500  py-4 ">
        <Link href="/">
          {" "}
          <Image
            className="w-16 px-2  sm:w-auto sm:px-6"
            alt="products"
            src="/logo.png"
            width={100}
            height={100}
          />
        </Link>
        <div className=" w-full text-left font-display text-3xl sm:text-6xl lg:text-center ">
          {children}
        </div>{" "}
        <Link href="/">
          <Image
            className="hidden w-16 px-2 sm:w-auto  sm:px-6 lg:block"
            alt="products"
            src="/logo.png"
            width={100}
            height={100}
          />
        </Link>
      </div>
    </div>
  );
};
export default LayoutShared;
