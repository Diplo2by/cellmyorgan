import Web3Modal from "web3modal";
import React, { useState } from "react"
import axios from "@/pages/api/axios";
import { ethers } from "ethers";
import taluk from "../../json/data.json"
import { resolve } from "styled-jsx/css"
import { organAddress, organListingAddress } from 'config'
import Organ from '../../artifacts/contracts/Organ.sol/Organ.json'
import OrganListing from '../../artifacts/contracts/OrganListing.sol/OrganListing.json'
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/router";

import {
  MainFormElement,
  DropdownFormElement,
  InputFormElement,
} from "./FormElements"

async function listOrgan(organs, url, bloodgroup) {
  const web3modal = new Web3Modal();
  const conn = await web3modal.connect();
  const provider = new ethers.providers.Web3Provider(conn);
  const signer = provider.getSigner();
  let organ = new ethers.Contract(organAddress, Organ.abi, signer)
  let transaction = await organ.createToken(url)
  let tx = await transaction.wait()

  let event = tx.events[0]
  let value = event.args[2]
  let tokenId = Number(value)
  
  let contract = new ethers.Contract(organListingAddress, OrganListing.abi, signer);
  transaction = await contract.ListOrgan(organAddress, tokenId, organs, bloodgroup, url);
  transaction = await contract.fetchOrganItems();
  return (transaction)
}

const RegistrationForm = () => {
  const router = useRouter();

  const [districtValue, setDistrictValue] = React.useState("Belagavi");
  const onDistrictChange = (event) => {
    const value = event.target.value;
    setDistrictValue(value);
  };
  // const onOrganChange = (e) => {
  //   const copy = { ...data }
  //   if (e.target.checked) {
  //     copy.organs.push(e.target.value)
  //     setData(copy)
  //   } else {
  //     copy.organs = copy.organs.filter(
  //       (value) => value !== e.target.value
  //     )
  //     setData(copy)
  //   }
  //   console.log(data.organs)
  // }

  const onRadioChange = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
    console.log(newData);
  };

  // const [photo, setImage] = useState('')
  const onImageChange = async (e) => {
    let base64 = await convertBase64(e.target.files[0]);
    // setImage(base64);
    const copy = { ...data };
    copy.photo = base64;
    setData(copy);
    // console.log(photo);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };

  const calculate_age = (dateString) => {
    var birthday = +new Date(dateString);
    return ~~((Date.now() - birthday) / 31557600000);
  }

  const redirectOnSuccess = () => {
    router.push("/organbank");
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    var age = await calculate_age(data.dob);
    const result = await axios.post("/api/form", {
      fname: data.fname,
      lname: data.lname,
      address: data.address,
      sex: data.sex,
      dob: data.dob,
      city: data.city,
      zip: data.zip,
      district: data.district,
      taluk: data.taluk,
      email: data.email,
      emgmob: data.emgmob,
      mob: data.mob,
      photo: data.photo,
      organ: data.organs,
      bloodtype: data.bloodtype,
      age: age,
    });
    const txnPromise = listOrgan(data.organs, result.data.url, data.bloodtype);

    toast.promise(txnPromise, {
      loading: "Processing...",
      success: () => `Transaction successful` + redirectOnSuccess(),
      error: "Error when fetching",
    });

    const txn = await txnPromise;

    console.log(txn);
  }

  const [data, setData] = useState({
    fname: "",
    lname: "",
    address: "",
    sex: "",
    dob: "",
    city: "",
    zip: "",
    district: districtValue,
    taluk: "",
    email: "",
    emgmob: "",
    mob: "",
    photo: "",
    organs: "",
    bloodtype: "",
  });

  async function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  }

  return (
    <div className="flex h-auto my-auto mb-auto px-2 mt-8">
      <div>
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{
            success: {
              duration: 7000,
            },
            error: {
              duration: 7000,
            },
            style: {
              paddingTop: "40px",
              paddingBottom: "40px",
              paddingLeft: "20px",
              paddingRight: "20px",
              minWidth: "30%",
            },
          }}
          containerStyle={{
            fontSize: "23px",
          }}
        />
      </div>
      <div className="flex w-[40%] justify-center ">
        <img
          src="/images/dono.png"
          alt="Image of a heart being donated"
          className=" w-auto h-[50%]"
        />
      </div>
      <div className="font-bold w-[60%] flex flex-col justify-center">
        <h1 className="flex justify-center text-3xl tracking-tight uppercase pb-10 px-auto">
          Organ Registration Form
        </h1>
        {/* <form action='/api/form' method='post' className="w-full max-w-lg"> */}
        <div className="flex justify-center">
          <form onSubmit={(e) => handleSubmit(e)} className="w-full max-w-2xl">
            <p className="text-2xl font-bold tracking-tight text-gray-900">
              Personal Details
            </p>
            <hr className="w-52 h-1 my-2 bg-gray-100 border-0 rounded md:my-2 dark:bg-gray-700"></hr>
            <div className="flex flex-wrap -mx-3 mb-6 mt-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="fname"
                >
                  First Name
                </label>
                <input
                  onChange={(e) => handle(e)}
                  id="fname"
                  value={data.fname}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Alan"
                />
                {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="lname"
                >
                  Last Name
                </label>
                <input
                  onChange={(e) => handle(e)}
                  id="lname"
                  value={data.lname}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="Fresco"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <textarea
                  onChange={(e) => handle(e)}
                  id="address"
                  value={data.address}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="57, Brigade Road, Ashok Nagar"
                />
                {/* <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <MainFormElement>
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="sex"
                >
                  Sex
                </label>
                <div>
                  <select
                    onChange={(e) => handle(e)}
                    id="sex"
                    value={data.sex}
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </MainFormElement>
              <MainFormElement>
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="dob"
                >
                  Date Of Birth
                </label>
                <input
                  onChange={(e) => handle(e)}
                  id="dob"
                  value={data.dob}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-3 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="date"
                  required
                />
              </MainFormElement>
              <MainFormElement>
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  onChange={(e) => handle(e)}
                  id="city"
                  value={data.city}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="Bengaluru"
                />
              </MainFormElement>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <MainFormElement>
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="zip"
                >
                  Zip
                </label>
                <input
                  onChange={(e) => handle(e)}
                  id="zip"
                  value={data.zip}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="80215"
                />
              </MainFormElement>
              <MainFormElement>
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="district"
                >
                  District
                </label>
                <div>
                  <select
                    onChange={(e) => {
                      handle(e);
                      onDistrictChange;
                    }}
                    id="district"
                    value={data.district}
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 mb-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option defaultValue disabled>
                      Select District
                    </option>
                    {Object.keys(taluk).map((key) => (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    ))}
                  </select>
                </div>
              </MainFormElement>
              <MainFormElement>
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="taluk"
                >
                  Taluk
                </label>
                <div>
                  <select
                    onChange={(e) => handle(e)}
                    id="taluk"
                    value={data.taluk}
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option defaultValue disabled>
                      Select Taluk
                    </option>
                    {taluk[data.district].Taluk.map((key) => (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    ))}
                  </select>
                </div>
              </MainFormElement>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <MainFormElement>
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  onChange={(e) => handle(e)}
                  id="email"
                  value={data.email}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="alan@ioptn.com"
                />
              </MainFormElement>
              <MainFormElement>
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="emgmob"
                >
                  Emergency Mobile
                </label>
                <input
                  onChange={(e) => handle(e)}
                  id="emgmob"
                  value={data.emgmob}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="9845125385"
                />
              </MainFormElement>
              <MainFormElement>
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="mob"
                >
                  Mobile
                </label>
                <input
                  onChange={(e) => handle(e)}
                  id="mob"
                  value={data.mob}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="9845125385"
                />
              </MainFormElement>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6 pb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="photo"
                >
                  Photo
                </label>
                <input
                  onChange={(e) => {
                    onImageChange(e);
                  }}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="file"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="bloodtype"
                >
                  Blood Group
                </label>
                <div>
                  <select
                    onChange={(e) => handle(e)}
                    id="bloodtype"
                    value={data.bloodtype}
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option>A Positive</option>
                    <option>A Negative</option>
                    <option>A Unknown</option>
                    <option>B Positive</option>
                    <option>B Negative</option>
                    <option>B Unknown</option>
                    <option>AB Positive</option>
                    <option>AB Negative</option>
                    <option>AB Unknown</option>
                    <option>O Positive</option>
                    <option>O Negative</option>
                    <option>O Unknown</option>
                    <option>Unknown</option>
                  </select>
                </div>
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-zip"
                >
                  OTP
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="password"
                  placeholder="*****"
                />
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mt-6">
                {/* <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                  
                  </label> */}
                <button
                  disabled
                  className="appearance-none block w-full py-3 px-4 leading-tight duration-200 bg-slate-800 hover:bg-gray-500 text-[#f4f7fb] font-base rounded"
                >
                  Get OTP
                </button>
              </div>
            </div>
            <p className="text-2xl font-bold tracking-tight text-gray-900">
              Organs to donate
            </p>
            <hr className="w-52 h-1 my-2 bg-gray-100 border-0 rounded md:my-2 dark:bg-gray-700"></hr>

            {/* <div className="flex flex-wrap -mx-3 mb-6 mt-6">
                <div className="w-full md:w-1/3 px-3 md:mb-3">
                  <input
                    onChange={onOrganChange}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0"
                    value="cornea"
                  />
                  <label className="ml-2 mb-0.5 text-base font-medium">
                    Corneas(eyes)
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 md:mb-0">
                  <input
                    onChange={onOrganChange}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0"
                    value="pancreas"
                  />
                  <label className="ml-2 mb-0.5 text-base font-medium">
                    Pancreas
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 md:mb-0 ">
                  <input
                    onChange={onOrganChange}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0"
                    value="liver"
                  />
                  <label className="ml-2 mb-0.5 text-base font-medium">Liver</label>
                </div>
                <div className="w-full md:w-1/3 px-3 md:mb-0">
                  <input
                    onChange={onOrganChange}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0"
                    value="lung"
                  />
                  <label className="ml-2 mb-0.5 text-base font-medium">Lungs</label>
                </div>
                <div className="w-full md:w-1/3 px-3 md:mb-0">
                  <input
                    onChange={onOrganChange}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0"
                    value="kidney"
                  />
                  <label className="ml-2 mb-0.5 text-base font-medium">Kidneys</label>
                </div>
                <div className="w-full md:w-1/3 px-3 md:mb-0">
                  <input
                    onChange={onOrganChange}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0"
                    value="heart"
                  />
                  <label className="ml-2 mb-0.5 text-base font-medium">Heart</label>
                </div>
              </div> */}
            <div className="flex flex-wrap -mx-3 mb-6 mt-6">
              <div className="w-full md:w-1/3 px-3 md:mb-3">
                <input
                  onChange={onRadioChange}
                  type="radio"
                  className="w-4 h-4 text-gray-800 border-gray-300 focus:ring-2 focus:ring-gray-300"
                  value="cornea"
                  name="organs"
                />
                <label className="ml-2 mb-0.5 text-base font-medium">
                  Corneas(eyes)
                </label>
              </div>
              <div className="w-full md:w-1/3 px-3 md:mb-0">
                <input
                  onChange={onRadioChange}
                  type="radio"
                  className="w-4 h-4 text-gray-800 border-gray-300 focus:ring-2 focus:ring-gray-300"
                  value="pancreas"
                  name="organs"
                />
                <label className="ml-2 mb-0.5 text-base font-medium">
                  Pancreas
                </label>
              </div>
              <div className="w-full md:w-1/3 px-3 md:mb-0 ">
                <input
                  onChange={onRadioChange}
                  type="radio"
                  className="w-4 h-4 text-gray-800 border-gray-300 focus:ring-2 focus:ring-gray-300"
                  value="liver"
                  name="organs"
                />
                <label className="ml-2 mb-0.5 text-base font-medium">
                  Liver
                </label>
              </div>
              <div className="w-full md:w-1/3 px-3 md:mb-0">
                <input
                  onChange={onRadioChange}
                  type="radio"
                  className="w-4 h-4 text-gray-800 border-gray-300 focus:ring-2 focus:ring-gray-300"
                  value="lung"
                  name="organs"
                />
                <label className="ml-2 mb-0.5 text-base font-medium">
                  Lungs
                </label>
              </div>
              <div className="w-full md:w-1/3 px-3 md:mb-0">
                <input
                  onChange={onRadioChange}
                  type="radio"
                  className="w-4 h-4 text-gray-800 border-gray-300 focus:ring-2 focus:ring-gray-300"
                  value="kidney"
                  name="organs"
                />
                <label className="ml-2 mb-0.5 text-base font-medium">
                  Kidneys
                </label>
              </div>
              <div className="w-full md:w-1/3 px-3 md:mb-0">
                <input
                  onChange={onRadioChange}
                  type="radio"
                  className="w-4 h-4 text-gray-800 border-gray-300 focus:ring-2 focus:ring-gray-300"
                  value="heart"
                  name="organs"
                />
                <label className="ml-2 mb-0.5 text-base font-medium">
                  Heart
                </label>
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6 mt-10">
              <button
                className="appearance-none block w-full py-3 px-4 leading-tight bg-green-500 hover:bg-green-400 text-[#f4f7fb] font-extrabold text-2xl rounded duration-200"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm
