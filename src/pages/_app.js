import "@/styles/globals.css";
import Nav from "../components/Nav";
import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../components/Footer";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <Head></Head>
      {console.log(router.route)}
      {router.route == "/register" || router.route == "/doctor" ? (
        <Nav showConnect />
      ) : (
        <Nav />
      )}
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
