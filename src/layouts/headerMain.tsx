import React from "react";
import Image from "next/image";
import HeroButton from "~/components/HeroButton";

const HeaderMain: React.FC = () => {
  return (
    <>
      <header className="h-screen w-full ">
        <Image
          className="object-cover"
          alt="image of cows grazing"
          fill={true}
          src={"/heroCattle.jpg"}
        />
        <div
          className="absolute top-0 grid h-screen w-full grid-rows-2 items-center justify-center 
          justify-items-center 
          gap-16
          bg-black/30
        font-display 
        lg:grid-cols-2 lg:justify-end lg:p-32"
        >
          <div className="-md:left-20 relative mx-auto h-min self-start  xl:col-start-1">
            <h1 className="font-rye w-min whitespace-nowrap text-8xl text-amber-50">
              {" "}
              St. Isidore Ranch
            </h1>
            <div className="font-accent text-6xl text-amber-50">
              Pasture to Fork
            </div>
          </div>

          <HeroButton
            text="About"
            link="#about"
            className="row-start-2 justify-self-end bg-white text-primary-500"
          />

          <HeroButton
            text="Shop"
            link="/shop"
            className="row-start-2 justify-self-start border-4 border-white bg-primary-500 text-white"
          />
        </div>
      </header>
    </>
  );
};
export default HeaderMain;
