import React, { useState } from "react";

const organs = useState(' an object with organ txns')

const TransactionTabular = () => {
    
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