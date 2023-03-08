
import Head from 'next/head'
import Nav from '@/components/Nav'
import Form from "@/components/Form";

import { organAddress, organListingAddress } from '../../config'
import axios from 'axios'
import web3modal from 'web3modal'

// import Organ from '../../artifacts/contracts/Organ.sol'
// import OrganListing from '../../artifacts/contracts/OrganListing.sol'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <h1>HOME</h1>
        <Nav></Nav>
      </Head>
    </>
  );
}
