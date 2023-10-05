import React from "react";
import Header from "./Header";
import Footer from "~/components/shared/Footer";

const LayoutMain = ({
  children,
}: React.PropsWithChildren) => {
  return (
    <div className="relative w-full">
      <Header />
      <div className="grid content-center justify-center justify-items-center gap-24 bg-backdrop-500 px-4 py-24 sm:px-16 md:grid-cols-2 md:justify-between  lg:py-32 lg:px-24 xl:grid-cols-1">
        {children}
      </div>
      <Footer />
    </div>
  );
};
export default LayoutMain;
