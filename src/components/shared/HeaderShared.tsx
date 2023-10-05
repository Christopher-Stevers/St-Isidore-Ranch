import { type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
const LayoutShared = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="flex w-full content-center items-center justify-between gap-8 p-8 px-16 pb-4">
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
export default LayoutShared;
