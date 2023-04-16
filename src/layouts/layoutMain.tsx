import React from "react";
import HeaderMain from "./headerMain";
import FooterMain from "./footerMain";

const LayoutMain = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <HeaderMain />
      <div className="grid content-center justify-center gap-16 bg-backdrop-500 px-24 py-32">
        {children}
      </div>
      <FooterMain />
    </>
  );
};
export default LayoutMain;
