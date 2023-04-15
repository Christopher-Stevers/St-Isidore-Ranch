import React from "react";
import HeaderMain from "./headerMain";
import FooterMain from "./footerMain";

const LayoutMain = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <HeaderMain />
      <div className="grid content-center justify-center bg-backdrop-500 p-32">
        {children}
      </div>
      <FooterMain />
    </>
  );
};
export default LayoutMain;
