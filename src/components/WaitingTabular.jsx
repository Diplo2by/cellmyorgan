import { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { patientAddress } from "config";
import Patient from "../../artifacts/contracts/Patient.sol/Patient.json"



const WaitListTabular = ({ organfilter, bloodfilter }) => {
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    loadPatients();
  }, [])
  const [loadingState, setLoadingState] = useState("not-loaded");

  const shortenAddress = (address) =>
    `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

  async function loadPatients() {

    const rpc = "http://localhost:8545"; // make it local variable later 
    const provider = new ethers.providers.JsonRpcProvider(rpc)

    const patientContract = new ethers.Contract(patientAddress, Patient.abi, provider);

    const data = await patientContract.getAllPatients();

    const items = await Promise.all(
      data.map(async (i) => {
        let item = {
          address: i.patientAddress,
          url: i.url,
          name: i.patientName,
          age: Number(i.patientAge),
          tokenId: Number(i.patientNumber),
          time: Date(i.unixTime),
          allocated: Number(i.allocated),
          organType: i.organType,
          bloodType: i.bloodType
        }
        return item;

      })
    )
    setPatients(items);
    setLoadingState("loaded");


  }
  function isAllocated(item) {
    if (item) {
      return <div className="text-red-500">True</div>;
    } else {
      return <div className="text-green-500">False</div>;
    }
  }



  return (
    <>
      <section className="antialiased rounded-xl text-gray-600 p-5 max-h-screen">
        <div className="flex flex-col justify-center">
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-2xl rounded-xl">
            <header className="px-5 py-4">
              <h2 className="font-extrabold text-gray-700 text-center text-3xl">
                Welcome to Waiting List
              </h2>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 pl-6 pr-6 whitespace-nowrap">
                        <div className="font-semibold text-left">Token ID</div>
                      </th>
                      <th className="p-2 pl-6 pr-6 whitespace-nowrap">
                        <div className="font-semibold text-left">Name</div>
                      </th>
                      <th className="p-2 pl-6 pr-6 whitespace-nowrap">
                        <div className="font-semibold text-left">Age</div>
                      </th>
                      <th className="p-2 pl-6 pr-6 whitespace-nowrap">
                        <div className="font-semibold text-left">
                          Wallet Address
                        </div>
                      </th>
                      <th className="p-2 pl-6 pr-6 whitespace-nowrap">
                        <div className="font-semibold text-left">Timestamp</div>
                      </th>
                      <th className="p-2 pl-6 pr-6 whitespace-nowrap">
                        <div className="font-semibold text-center">
                          Blood Group
                        </div>
                      </th>
                      <th className="p-2 pl-6 pr-6 whitespace-nowrap">
                        <div className="font-semibold text-center">
                          Organ Type
                        </div>
                      </th>
                      <th className="p-2 pl-6 pr-6 whitespace-nowrap">
                        <div className="font-semibold text-center">Report</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {patients
                      .filter(function (params) {
                        console.log(bloodfilter, organfilter);
                        if (
                          organfilter == undefined &&
                          bloodfilter == undefined
                        )
                          return params;
                        else if (organfilter == undefined)
                          return params.bloodType == bloodfilter;
                        else if (bloodfilter == undefined)
                          return params.organType == organfilter;
                        else
                          return (
                            params.bloodType == bloodfilter &&
                            params.organType == organfilter
                          );
                      })
                      .sort((a, b) => a.age - b.age)
                      .map((item, index) => (
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
                              {item.name}
                              {}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">{item.age}</div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex flex-row justify-center items-center text-left font-medium">
                              <span className="text-green-500">
                                {shortenAddress(item.address)}
                              </span>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-sm text-center">
                              {item.time}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-sm text-center">
                              {item.bloodType}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-sm text-center font-bold">
                              {item.organType}
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

export default WaitListTabular;
