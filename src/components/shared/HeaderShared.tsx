import Link from "next/link";
import Image from "next/image";

const LayoutShared = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  const headerLinks = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/shop" },
    { name: "Contact", link: "/contact" },
    { name: "Blog", link: "/blog" },
  ];

  return (
    <div className={`w-full bg-primary-700 ${className}`}>
      <div className="py-4 font-display text-2xl text-white lg:text-4xl">
        <div className="flex w-full content-center items-center justify-between ">
          <Link href="/">
            {" "}
            <Image
              className="object-fit w-16 rounded-full px-2  sm:w-auto sm:px-6"
              alt="products"
              src="/logo_white_transparent.png"
              width={100}
              height={100}
            />
          </Link>
          {headerLinks.slice(0, 3).map((link) => {
            return (
              <Link
                key={link.name}
                className={`px-2  ${
                  title.toLowerCase() ===
                  link.name.toLowerCase()
                    ? "text-white"
                    : "text-white/70"
                } hover:underline`}
                href={link.link}
              >
                {link.name}
              </Link>
            );
          })}
          <Link href="/">
            <Image
              className="object-fit w-16 rounded-full px-2  sm:w-auto sm:px-6"
              alt="products"
              src="/logo_white_transparent.png"
              width={100}
              height={100}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LayoutShared;
