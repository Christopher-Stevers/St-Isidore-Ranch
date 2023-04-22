import React from "react";
import HeaderMain from "./headerMain";
import FooterMain from "./footerMain";

const LayoutMain = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="relative w-full">
      <HeaderMain />
      <div className="grid content-center justify-center justify-items-center gap-16 bg-backdrop-500 px-4 py-24 sm:px-16 md:grid-cols-2 md:justify-between  lg:py-32 lg:px-24 xl:grid-cols-1">
        {children}
      </div>
      <FooterMain />
    </div>
  );
};
export default LayoutMain;
