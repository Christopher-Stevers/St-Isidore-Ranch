import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config.cjs";
import { useEffect, useState } from "react";

type MediaQueryTypes =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "nothing";

const fullConfig = resolveConfig(tailwindConfig) as {
  theme: {
    screens: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      "2xl": string;
    };
  };
};

const useMediaQuery = (): MediaQueryTypes => {
  const [
    currentMediaQueryString,
    setCurrentMediaQueryString,
  ] = useState<MediaQueryTypes>("nothing");
  // ignore ts error
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const {
    md,
    sm,
    lg,
    xl,
    "2xl": doubleXl,
  } = fullConfig.theme.screens;
  useEffect(() => {
    const resizeHandler = () => {
      if (
        window.matchMedia(`(min-width: ${doubleXl})`)
          .matches
      ) {
        setCurrentMediaQueryString("2xl");
      } else if (
        window.matchMedia(`(min-width: ${xl})`).matches
      ) {
        setCurrentMediaQueryString("xl");
      } else if (
        window.matchMedia(`(min-width: ${lg})`).matches
      ) {
        setCurrentMediaQueryString("lg");
      } else if (
        window.matchMedia(`(min-width: ${md})`).matches
      ) {
        setCurrentMediaQueryString("md");
      } else if (
        window.matchMedia(`(min-width: ${sm})`).matches
      ) {
        setCurrentMediaQueryString("sm");
      }
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);
  return currentMediaQueryString;
};

export default useMediaQuery;

export const mediaQueryCompare = (
  currentMediaQueryString: MediaQueryTypes,
  targetMediaQueryString: MediaQueryTypes,
) => {
  const mediaQuery = {
    nothing: -1,
    sm: 0,
    md: 1,
    lg: 2,
    xl: 3,
    "2xl": 4,
  };
  return (
    mediaQuery[currentMediaQueryString] >=
    mediaQuery[targetMediaQueryString]
  );
};
