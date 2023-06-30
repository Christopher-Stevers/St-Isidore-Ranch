import HeaderSecondary from "~/layouts/headerSecondary";
import FooterMain from "~/layouts/footerMain";
import { type ReactNode } from "react";
const LayoutSecondary = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <>
      <HeaderSecondary>{title}</HeaderSecondary>
      <div className="grid min-h-[calc(100vh-340px)] grid-cols-[320px] content-center justify-center justify-items-center gap-16 pb-48 lg:grid-cols-[repeat(2,_320px)] xl:grid-cols-[repeat(3,_320px)] ">
        {children}
      </div>
      <FooterMain />
    </>
  );
};
export default LayoutSecondary;
