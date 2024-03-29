import { type AppType } from "next/app";
import { hotjar } from "react-hotjar";
import Head from "next/head";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import {
  Roboto,
  Rye,
  Cantarell,
  Tangerine,
} from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import OrderProvider from "~/providers/OrderProvider";
import { useEffect } from "react";

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
  useEffect(() => {
    hotjar.initialize(3197536, 6);
  }, []);
  return (
    <>
      <Head>
        <title>St Isidore Ranch</title>
        <meta title="St Isidore Ranch" />
        <meta
          name="description"
          content="Grass fed beef | from pasture to plate"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <SessionProvider session={session}>
        <OrderProvider>
          <main
            className={`${roboto.variable} ${rye.variable} ${cantarell.variable} ${tangerine.variable} font-sans`}
          >
            <Component {...pageProps} />
          </main>
        </OrderProvider>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
