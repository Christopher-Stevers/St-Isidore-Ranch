import React from "react";
import Image from "next/image";

const HeaderMain: React.FC = () => {
  return (
    <>
      <header className="h-screen w-full ">
        <Image
          className="object-cover grayscale"
          alt="image of bull"
          fill={true}
          src={"/stockCattle.jpg"}
        />
        <div
          className="font-display fixed top-0 grid h-screen w-full grid-rows-2 
          items-center 
          justify-center
        justify-items-center bg-black/80  bg-gradient-to-r 
         from-sky-500/5 to-red-900/10 
        lg:grid-cols-2 lg:justify-end xl:grid-cols-[1fr_0.6fr_1.4fr]"
        >
          <div className="-md:left-20 relative mx-auto h-min lg:col-start-2 xl:col-start-3">
            <div className="w-min whitespace-nowrap font-serif text-6xl text-amber-50">
              {" "}
              GRASS-FED BEEF
            </div>
            <div className="font-sans text-xl text-amber-50">
              THE WAY ITS <strong className="text-red-400">MEANT</strong> TO BE
              GROWN
            </div>
          </div>
        </div>
        <h1>Header</h1>
      </header>
    </>
  );
};
export default HeaderMain;
