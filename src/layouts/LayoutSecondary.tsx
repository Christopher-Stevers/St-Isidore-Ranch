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
      <div className="min-h-[calc(100vh-340px)] pb-48 ">
        {children}
      </div>
      <FooterMain />
    </>
  );
};
export default LayoutSecondary;
