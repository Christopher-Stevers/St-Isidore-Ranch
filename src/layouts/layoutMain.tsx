import React from "react";
import HeaderMain from "./headerMain";
import FooterMain from "./footerMain";

const LayoutMain = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <HeaderMain />
      {children}
      <FooterMain />
    </>
  );
};
export default LayoutMain;
