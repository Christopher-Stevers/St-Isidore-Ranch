import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Roboto, Rye, Cantarell, Tangerine } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--roboto",
});
const rye = Rye({
  weight: "400",
  subsets: ["latin"],
  variable: "--rye",
});
const cantarell = Cantarell({
  weight: "400",
  subsets: ["latin"],
  variable: "--cantarell",
});
const tangerine = Tangerine({
  weight: "400",
  subsets: ["latin"],
  variable: "--tangerine",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <main
        className={`${roboto.variable} ${rye.variable} ${cantarell.variable} ${tangerine.variable} font-sans`}
      >
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
