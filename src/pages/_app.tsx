import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Roboto_Slab, Roboto } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  variable: "--roboto",
});
const robotoSlab = Roboto_Slab({
  weight: "400",
  subsets: ["latin"],
  variable: "--roboto-slab",
});
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <main className={`${roboto.variable} ${robotoSlab.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
