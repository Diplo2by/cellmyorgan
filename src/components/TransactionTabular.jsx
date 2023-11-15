import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { organListingAddress, organAddress } from "config";
import Organ from "../../artifacts/contracts/Organ.sol/Organ.json";
import OrganListing from "../../artifacts/contracts/OrganListing.sol/OrganListing.json";
import Link from "next/link";
import axios from "axios";

const TransactionTabular = () => {
  const [organs, setOrgans] = useState([]);
  useEffect(() => {
    loadOrgans();
  }, []);


  const [loadingState, setLoadingState] = useState("not-loaded");
  const shortenAddress = (address) =>
    `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
  async function loadOrgans() {
    const rpc = process.env.SEPOLIA_URL; // make it local variable later 
    const provider = new ethers.providers.JsonRpcProvider(rpc)

    const organListingContract = new ethers.Contract(
      organListingAddress,
      OrganListing.abi,
      provider
    );
    const organContract = new ethers.Contract(
      organAddress,
      Organ.abi,
      provider
    );
    const data = await organListingContract.fetchAllOrgans();
    console.log(data)
    const formatDate = (dt) => {
      var dateArray = dt.split("");
      dateArray.splice(dt.indexOf("GMT") - 4);
      return dateArray.join("");
    }

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await organContract.tokenURI(i.tokenId);
        // const metadata = await axios.get(tokenUri)
        const contents = (await axios.get(tokenUri)).data;
        // console.log(contents)
        let item = {
          organId: Number(i.organId),
          allocated: Number(i.allocated),
          organType: i.organType,
          tokenId: Number(i.tokenId),
          bloodGroup: i.bloodGroup,
          timeExtracted: formatDate(Date(i.unixTime)),
          dateExtracted: formatDate(Date(i.unixTime)),
          donor: i.donor,
          recipient: i.recipient,
          url: i.url,
        };
        return item;
      })
    );
    setOrgans(items);
    setLoadingState("loaded");
  }


  return (
    <>
      <section className="antialiased rounded-xl p-5 min-h-screen h-auto">
        <div className="flex flex-col justify-center">
          <div className="max-w-[90%] m-auto px-4 sm:px-6 lg:px-8 bg-white shadow-2xl rounded-xl">
            <header className="px-5 py-4">
              <h2 className="font-extrabold text-center text-3xl">
                Recent Transactions
              </h2>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-500 bg-gray-50">
                    <tr>
                      <th className="p-2 pl-6 pr-6 whitespace-nowrap">
                        <div className="font-semibold text-left">
                          Token ID
                        </div>
                      </th>
                      <th className="p-2 pl-6 pr-6 whitespace-nowrap">
                        <div className="font-semibold text-left">Donor</div>
                      </th>
                      <th className="p-2 pl-6 pr-6 whitespace-nowrap">
                        <div className="font-semibold text-left">
                          Recipient
                        </div>
                      </th>
                      <th className="p-2 pl-6 pr-6 whitespace-nowrap">
                        <div className="font-semibold text-left">
                          Blood Type
                        </div>
                      </th>
                      <th className="p-2 pl-6 pr-6 whitespace-nowrap">
                        <div className="font-semibold text-left">
                          Timestamp
                        </div>
                      </th>
                      <th className="p-2 pl-6 pr-6 whitespace-nowrap">
                        <div className="font-semibold text-center">
                          Organ Type
                        </div>
                      </th>
                      <th className="p-2 pl-6 pr-6 whitespace-nowrap">
                        <div className="font-semibold text-center">
                          Report
                        </div>
                      </th>
                      <th className="p-2 pl-6 pr-6 whitespace-nowrap">
                        <div className="font-semibold text-center"></div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {/* MAP ORGANS OBJECT HERE */}
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
                                alt="Imtooz"
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
                          <div className="text-sm text-center font-bold uppercase">
                            {/* {isAllocated(item.allocated)} */}
                            {item.organType}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-sm text-center font-bold">
                            <Link href={item.url} target="blank">
                              🗎
                            </Link>
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
      </section>
    </>
  );
};

export default TransactionTabular;