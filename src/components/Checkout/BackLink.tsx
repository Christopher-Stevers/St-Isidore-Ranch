import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { type ReactNode } from "react";

const BackLink = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="flex content-center items-center gap-2 py-8 hover:text-primary-500 hover:underline">
      <ChevronLeftIcon className="h-4 w-4 text-current" />
      {children}
    </div>
  );
};

export default BackLink;
