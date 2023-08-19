import React, { type ReactNode } from "react";
const CSSSwitch = ({
  variable,
  constants,
  children,
}: {
  variable: string;
  constants: string | string[];
  children: ReactNode;
}) => {
  const constantArray = Array.isArray(constants)
    ? constants
    : [constants];
  return (
    <div
      className={
        constantArray.includes(variable)
          ? "block"
          : "hidden"
      }
    >
      {children}
    </div>
  );
};

export default CSSSwitch;
