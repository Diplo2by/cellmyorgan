import { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { patientAddress, organListingAddress, organAddress } from "config";
import Patient from "../../artifacts/contracts/Patient.sol/Patient.json"
import OrganListing from '../../artifacts/contracts/OrganListing.sol/OrganListing.json'
import Organ from '../../artifacts/contracts/Organ.sol/Organ.json'
import Link from "next/link";
import { useSession } from "next-auth/react";

const WaitListTabular = ({
  organfilter,
  bloodfilter,
  title = "Welcome to Waiting List",
  organId,
  showConfirm = false,
}) => {
  const { data: session } = useSession();
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    loadPatients();
  }, []);
  const [loadingState, setLoadingState] = useState("not-loaded");

  const shortenAddress = (address) =>
    `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

  const loadPatients = async () => {
    const rpc = "http://localhost:8545"; // make it local variable later
    const provider = new ethers.providers.JsonRpcProvider(rpc);

    const patientContract = new ethers.Contract(
      patientAddress,
      Patient.abi,
      provider
    );

    const data = await patientContract.getAllPatients();

    const formatDate = (dt) => {
      var dateArray = dt.split("");
      dateArray.splice(dt.indexOf("GMT") - 4);
      return dateArray.join("");
    };

    const items = await Promise.all(
      data.map(async (i) => {
        let item = {
          address: i.patientAddress,
          url: i.url,
          name: i.patientName,
          age: Number(i.patientAge),
          tokenId: Number(i.patientNumber),
          time: formatDate(Date(i.unixTime)),
          allocated: Number(i.allocated),
          organType: i.organType,
          bloodType: i.bloodType,
        };
        return item;
      })
    );
    setPatients(items);
    setLoadingState("loaded");
  }
  // function isAllocated(item) {
  //   if (item) {
  //     return <div className="text-red-500">True</div>;
  //   } else {
  //     return <div className="text-green-500">False</div>;
  //   }
  // }
  const [patientChosen, setPatientChosen] = useState('')
  const onRadioChange = (e) => {
    setPatientChosen(e.target.value)
    console.log(patientChosen);
  };

  async function allocateOrgans(organ_id) {
    const web3modal = new Web3Modal();
    const conn = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(conn);
    const signer = provider.getSigner();
    let organ = new ethers.Contract(organAddress, Organ.abi, signer)

    let contract = new ethers.Contract(organListingAddress, OrganListing.abi, signer);
    let txn = await contract.AllocateOrgan(organAddress , 2);
    await txn.wait()
    return (String(await signer.getAddress() ) )

  }

  return (
    <>
      <section className="antialiased rounded-xl p-5 max-h-screen">
        <div className="flex flex-col justify-center">
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-2xl rounded-xl">
            <header className="px-5 py-4">
              <h2 className="font-extrabold text-center text-3xl">{title}</h2>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-500 bg-gray-50">
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
                              { }
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-center">{item.age}</div>
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
                            <div className="text-sm text-center font-bold uppercase">
                              {item.organType}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-sm text-center">
                              <Link href={item.url} target="blank">
                                🗎
                              </Link>
                            </div>
                          </td>
                          {session?.user?.role == "doctor" && showConfirm && (
                            <td className="p-2 whitespace-nowrap">
                              {/* <button
                                className="bg-[#720ac7] hover:bg-[#C160FF] text-[#f4f7fb] py-2 px-6 rounded md:ml-8 duration-200 font-extrabold text-lg"
                                onClick={(e) =>
                                  onAllocateClick(
                                    item.organType,
                                    item.bloodGroup
                                  )
                                }
                              >
                                Allocate
                              </button> */}
                              <input
                                onChange={onRadioChange}
                                type="radio"
                                className="w-4 h-4 text-gray-800 border-gray-300 focus:ring-2 focus:ring-gray-300"
                                value={item.tokenId}
                                name="allocation"
                              />
                            </td>
                          )}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            {session?.user?.role == "doctor" && showConfirm && (
              <div className="w-full py-2 pb-6 flex justify-center">
                <button
                  className="bg-green-500 hover:bg-green-400 text-[#f4f7fb] py-2 px-6 rounded md:ml-8 duration-200 font-extrabold text-lg"
                  onClick={(e) => {
                    let hash = "done"
                    allocateOrgans(patientAddress).then((msg) => alert('THE FINAL CHOSEN PATIENT IS : ' + patientChosen + ' ORGAN ID IS : ' + organId));
                    
                  }
                  }
                >
                  Confirm Allocation
                </button>
              </div>
            )}
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
