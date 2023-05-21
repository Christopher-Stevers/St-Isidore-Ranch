import { type NextPage } from "next";
import Head from "next/head";
import Headline from "~/layouts/Headline";
import AdminMutations from "~/components/AdminMutations";
import { signIn, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const handleSignIn = () => {
    signIn().catch(console.error);
  };
  const session = useSession();
  console.log(session, "my session");
  return (
    <>
      <Head>
        <title>Create T3 App</title>

        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Headline>Admin</Headline>
      <main>
        <button onClick={handleSignIn}>Sign In</button>
        <AdminMutations />
      </main>
    </>
  );
};

export default Home;
