import { type PropsWithChildren } from "react";

const Headline = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex w-full content-center items-center justify-center bg-primary-500 p-4">
      <div className=" font-display text-6xl text-white">{children} </div>
    </div>
  );
};
export default Headline;
