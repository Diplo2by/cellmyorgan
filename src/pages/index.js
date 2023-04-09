import Head from "next/head";

// import Organ from '../../artifacts/contracts/Organ.sol'
// import OrganListing from '../../artifacts/contracts/OrganListing.sol'

export default function Home() {
  return (
    <>
      <Head>
        <title>Organ Donation Portal</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Hero></Hero>
      <Footer></Footer>
    </>
  );
}
