import '@/styles/globals.css'
import Nav from '../components/Nav'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return <>
  <Head>
  </Head>
    <Nav />
    <Component {...pageProps} />
  </>
}
