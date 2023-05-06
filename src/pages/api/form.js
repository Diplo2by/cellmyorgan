//WIP
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { ethers } from 'ethers'
import { organAddress, organListingAddress } from 'config'
import Organ from '../../../artifacts/contracts/Organ.sol/Organ'
import OrganListing from '../../../artifacts/contracts/OrganListing.sol/OrganListing'
// import Web3Modal from "web3modal";



const auth = 'Basic ' + Buffer.from(process.env.INFURA_PROJECT_ID + ':' + process.env.INFURA_API_KEY).toString('base64')

const client = ipfsHttpClient({
  host: 'ipfs.infura.io',
  port: '5001',
  protocol: 'https',
  headers: {
    authorization: auth,
  },

})
async function ipfsPin(data) {
  try {
    const added = await client.add(JSON.stringify(data))
    const url = process.env.IPFS_DEDICATED_SUBDOMAIN + added.path
    return url
  }
  catch (e) {
    console.log('There was an error uploading data:', e)
  }

}

// async function connectWallet() {
//   try {
//     const web3modal = new Web3Modal();
//     const conn = await web3modal.connect();
//     const provider = new ethers.providers.Web3Provider(conn);
//     const signer =provider.getSigner();
//     console.log("Connection successfull Signer ");
//     return signer
//   } catch (e) {
//     console.log(e);
//   }
// }

async function listOrgan(url) {
  try {
    let contract = new ethers.Contract(organAddress, Organ.abi, signer)
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()

    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = Number(value)

    contract = new ethers.Contract(organListingAddress, OrganListing.abi, signer)
    transaction = await contract.ListOrgan(organAddress, tokenId, 'Kidney', 'A+')

    return transaction
  }
  catch (e) {
    console.log('imma start cryin frfr')
    console.log(e)
  }

}

export default async function handler(req, res) {
  const body = req.body;
  if (req.method !== "POST") {
    res.status(504).json("only post allowed");
    return;
  }
  const link = await ipfsPin(body)
  //const txn = await listOrgan(link)
  //console.log(txn)
  res.status(200).json({ data: "recieved", body: body, url: link });

}
