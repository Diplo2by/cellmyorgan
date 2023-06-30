import "@/styles/globals.css";
import Nav from "../components/Nav";
import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { getToken } from "next-auth/jwt";
import "./index.css";

export default function App({ Component, pageProps }) {
  // const router = useRouter();
  // const protectedRoutes = ['/admin'];
  // if (protectedRoutes.includes(router.route)) {
  //   const token = getToken()
  //   console.log(token);
  //   //check token
  // } else {
  //   // redirect
  // }

  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Head />
          <Nav />
        <Component {...pageProps} />
        <Footer />
      </SessionProvider>
    </>
  );
}
