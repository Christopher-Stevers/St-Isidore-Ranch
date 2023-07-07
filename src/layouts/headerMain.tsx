import React from "react";
import Image from "next/image";
import HeroButton from "~/components/HeroButton";

const HeaderMain: React.FC = () => {
  return (
    <>
      <header className="relative h-screen w-full ">
        <Image
          className="absolute top-0 object-cover"
          alt="image of cows grazing"
          fill={true}
          src={"/heroCattle.jpg"}
        />
        <div
          className=" absolute top-0 
          grid h-screen w-full
          items-center
          justify-center
          justify-items-center
        gap-16
        font-display
        lg:grid-cols-2
        lg:grid-rows-2 lg:justify-end lg:p-32"
        >
          <div className="-md:left-20 relative mx-auto grid h-min gap-8 md:col-span-2 lg:col-span-1 lg:col-start-1 lg:self-start">
            <h1 className="flex w-min w-full flex-wrap justify-center gap-x-4 gap-y-4 whitespace-nowrap font-display text-6xl text-black md:text-7xl lg:flex-nowrap lg:justify-start lg:text-8xl">
              <span className="inline"> St. Isidore </span>
              <span className="inline">Ranch</span>
            </h1>
            <div className="text-center font-accent text-5xl text-black lg:text-left lg:text-6xl">
              Pasture to Plate
            </div>
          </div>

          <HeroButton
            text="About"
            link="#about"
            className="justify-self-center bg-white text-primary-500 md:row-start-2 md:justify-self-end"
          />

          <HeroButton
            text="Shop"
            link="/shop"
            className="row-start-3 border-4 border-white bg-primary-500 text-white md:row-start-2 md:justify-self-start"
          />
        </div>
      </header>
    </>
  );
};
export default HeaderMain;
