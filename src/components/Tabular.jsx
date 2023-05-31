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

async function loadOrgans() {
  const web3modal = new Web3Modal()
  const conn = await web3modal.connect()
  const provider = new ethers.providers.Web3Provider(conn)
  const signer = provider.getSigner()

  const organListingContract = new ethers.Contract(organListingAddress, OrganListing.abi, signer);
  const organContract = new ethers.Contract(organAddress,Organ.abi,signer);
  const data = await organListingContract.fetchOrganItems();
  console.log(data)
  
}


const Tabular = () => {
  const [transactionsStore] = useState("transactions");
  const [transactionCount] = useState("transactionCount");
  const [transactions, setTransaction] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(6);

//   const makeImage = (address) => {
//     const data = new Identicon(address, 400).toString();
//     return `data:image/png;base64,${data}`;
//   };

  const loadMoreTransactions = () => {
    setTransaction((prevState) => [
      ...prevState,
      ...transactionsStore.slice(start, end),
    ]);
    setStart(end);
    setEnd(end * 2);
  };

  const shortenAddress = (address) =>
    `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

  useEffect(() => {
    // getAllTransactions().then((data) => {
    //   setTransaction([...data.slice(start, end)]);
      setStart(end);
      setEnd(end * 2);
    // });
  }, []);

  return (
    <>
      <section className="antialiased rounded-xl text-gray-600 p-5">
        <div className="flex flex-col justify-center h-full">
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-2xl rounded-xl">
            <header className="px-5 py-4">
              <h2 className="font-semibold text-gray-800 text-center">
                Total Transactions({transactionCount})
              </h2>
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
                        <div className="font-semibold text-left">Blood Type</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Timestamp</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Remark</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {transactions.map((tx, index) => (
                      <tr key={index + 1}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                              {/* <img
                                className="rounded-full"
                                src={makeImage(tx.sender)}
                                width="40"
                                height="40"
                                alt="Alex Shatov"
                              /> */}
                            </div>
                            <div className="font-medium text-gray-800">
                              {/* {faker.name.findName()} */}
                              Shrivardan Kumar
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">
                            <a
                              href={`https://ropsten.etherscan.io/address/${tx.sender}`}
                              target="_blank"
                              rel="noreferrer"
                              className="hover:text-blue-500"
                            >
                              {/* {shortenAddress(tx.sender)} */}
                              { shortenAddress("0x006edb7dee9873aa4bf765b42a66db84fd775de10039332c2ec0e837c3110448") }
                            </a>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">
                            <a
                              href={`https://ropsten.etherscan.io/address/${tx.receiver}`}
                              target="_blank"
                              rel="noreferrer"
                              className="hover:text-blue-500"
                            >
                              {shortenAddress(tx.receiver)}
                            </a>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex flex-row justify-center items-center text-left font-medium">
                            {/* <img
                              className="w-3 h-3 object-contain cursor-pointer mr-1"
                              src={ethLogo}
                              alt="Etherium Logo"
                            /> */}
                            <span className="text-green-500">{tx.amount}</span>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-sm text-center">
                            {tx.timestamp}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-sm text-center">{tx.remark}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button onClick={loadOrgans}> Show Organs</button>
        </div>
      </section>
    </>
  );
};

export default Tabular;
