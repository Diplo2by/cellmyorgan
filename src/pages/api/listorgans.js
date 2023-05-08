import { organAddress, organListingAddress } from 'config'
import Organ from '../../../artifacts/contracts/Organ.sol/Organ'
import OrganListing from '../../../artifacts/contracts/OrganListing.sol/OrganListing'
import { ethers } from 'ethers'

export default async function handler(req, res) {
    const provider = new ethers.providers.JsonRpcProvider()
    const contract = new ethers.Contract(organListingAddress, OrganListing.abi, provider)
    const data = await contract.fetchMarketItems()

    res.status(200).json({ ...data })
}
