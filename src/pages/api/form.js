import { create as ipfsHttpClient } from 'ipfs-http-client'

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


export default async function handler(req, res) {
  const body = req.body;
  if (req.method !== "POST") {
    res.status(504).json("only post allowed");
    return;
  }
  const link = await ipfsPin(body)
  // const txn = await listOrgan(link,body.signer)
  // console.log(txn)
  res.status(200).json({ data: "recieved", url: link });

}
