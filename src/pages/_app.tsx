import { type AppType } from "next/app";
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
import { CartProvider } from "~/providers/cart";

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
        <CartProvider>
          <main
            className={`${roboto.variable} ${rye.variable} ${cantarell.variable} ${tangerine.variable} font-sans`}
          >
            <Component {...pageProps} />
          </main>
        </CartProvider>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
