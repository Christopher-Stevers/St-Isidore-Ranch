import { type NextPage } from "next";
import AdminMutations from "~/components/AdminMutations";
import { signIn, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const handleSignIn = () => {
    signIn().catch(console.error);
  };
  const data = useSession();
  return (
    <>
      Admin
      <main>
        <button onClick={handleSignIn}>Sign In</button>
        <div>{JSON.stringify(data)}</div>
        <AdminMutations />
      </main>
    </>
  );
};

export default Home;
