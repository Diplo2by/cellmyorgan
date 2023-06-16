import Head from "next/head";
import Login from "@/components/Login";

function LoginPage() {
  return (
    <>
      <Head>
        <title>Doctor Login</title>
      </Head>
      <Login/>
    </>
  );
}

export default LoginPage;
