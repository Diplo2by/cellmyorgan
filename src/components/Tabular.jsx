import { useEffect, useState } from "react";
// import ethLogo from "../assets/ethlogo.png";
// import Identicon from "identicon.js";
// import faker from "@faker-js/faker";
// import { getAllTransactions } from "../shared/Transaction";
// import { useGlobalState } from "../store";

import Organ from '../../artifacts/contracts/Organ.sol/Organ.json'
import OrganListing from '../../artifacts/contracts/OrganListing.sol/OrganListing.json'
import { organAddress, organListingAddress } from 'config'
import Web3Modal from "web3modal";
import { ethers } from 'ethers'
import axios from 'axios'


function isAllocated(item) {
  if (item) {
    return <div className="text-red-500">True</div>
  }
  else {
    return <div className="text-green-500">False</div>
  }
}

const Tabular = () => {
  const [organs, setOrgans] = useState([])
  useEffect(() => {
    loadOrgans()
  }, [])

  async function loadOrgans() {
    const web3modal = new Web3Modal()
    const conn = await web3modal.connect()
    const provider = new ethers.providers.Web3Provider(conn)
    const signer = provider.getSigner()

    const organListingContract = new ethers.Contract(organListingAddress, OrganListing.abi, provider);
    const organContract = new ethers.Contract(organAddress, Organ.abi, provider);
    const data = await organListingContract.fetchOrganItems();

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await organContract.tokenURI(i.tokenId)
      // const metadata = await axios.get(tokenUri)
      const contents = (await axios.get(tokenUri)).data;
      // console.log(contents)
      let item = {
        organId: Number(i.organId),
        allocated: Number(i.allocated),
        organType: i.organType,
        tokenId: Number(i.tokenId),
        bloodGroup: i.bloodGroup,
        timeExtracted: Date(i.unixTime),
        dateExtracted: Date(i.unixTime),
        donor: i.donor,
        recipient: i.recipient,
        url: i.url
      }
      return item
    }))
    setOrgans(items)
    setLoadingState('loaded')

  }

  const [loadingState, setLoadingState] = useState('not-loaded')



  const shortenAddress = (address) =>
    `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;


  return (
    <>
      <section className="antialiased rounded-xl text-gray-600 p-5">
        <div className="flex flex-col justify-center h-screen">
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-2xl rounded-xl">
            <header className="px-5 py-4">
              <h2 className="font-semibold text-gray-800 text-center"></h2>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Token ID</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Donor</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Recipient</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">
                          Blood Type
                        </div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Timestamp</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">
                          Allocation
                        </div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">
                          Organ Type
                        </div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Report</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {organs?.map((item, index) => (
                      <tr key={index + 1}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                              {/* <img
                                className="rounded-full"
                                src={makeImage(item.sender)}
                                width="40"
                                height="40"
                                alt="Alex Shatov"
                              /> */}
                            </div>
                            <div className="font-medium text-gray-800">
                              {/* {faker.name.findName()} */}
                              {item.tokenId}
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">
                            {/* {shortenAddress(item.sender)} */}
                            {shortenAddress(item.donor)}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">
                            {shortenAddress(item.recipient)}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex flex-row justify-center items-center text-left font-medium">
                            <span className="text-green-500">
                              {item.bloodGroup}
                            </span>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-sm text-center">
                            {item.timeExtracted}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-sm text-center">
                            {isAllocated(item.allocated)}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-sm text-center font-bold">
                            {item.organType.toUpperCase()}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-sm text-center">
                            <a href={item.url} target="blank">
                              🗎
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* <div>
          <button onClick={loadOrgans}> Show Organs</button>
        </div> */}
      </section>
    </>
  );
};

export default Tabular;