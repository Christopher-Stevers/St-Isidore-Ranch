import { type ReactNode } from "react";
import Headline from "./Headline";
const headerSecondary = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <Headline>{children}</Headline>;
};
export default headerSecondary;
