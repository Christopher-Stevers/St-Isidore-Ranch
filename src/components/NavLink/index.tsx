import Link from "next/link";
export type NavlinkType = {
  className: string | undefined;
  name: string;
  href: string | undefined;
};
const Navlink = ({
  className,
  name,
  href,
}: NavlinkType) => {
  const activeHref = href || `/${name}`;
  return (
    <Link
      href={activeHref}
      className={`mx-4 text-amber-50 ${className}`}
    >
      {name}
    </Link>
  );
};
export default Navlink;
