import Web3Modal from "web3modal";
import React, { useState } from "react";
import axios from "@/pages/api/axios";
import { ethers } from "ethers";
import taluk from "../../json/data.json";
import { patientAddress } from "config";
import Patient from "../../artifacts/contracts/Patient.sol/Patient.json"
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

import {
  MainFormElement,
  DropdownFormElement,
  InputFormElement,
} from "./FormElements";

let g_age = 0;
async function listPatient(url, name, age, organType, bloodType) {
  const router = useRouter();

  // try {
  const web3modal = new Web3Modal();
  const conn = await web3modal.connect();
  const provider = new ethers.providers.Web3Provider(conn);
  const signer = provider.getSigner();
  const patientContract = new ethers.Contract(
    patientAddress,
    Patient.abi,
    signer
  );
  let transaction = await patientContract.listNewPatient(
    signer.getAddress(),
    url,
    name,
    age,
    organType,
    bloodType
  );
  await transaction.wait();
  let txn = await patientContract.getAllAddress();
  return (txn);
  // }
  // catch (e) {
  //   console.log('Imma cri')
  //   console.log(e)
  // }
}

const togglePage = () => {
  let page1 = document.getElementsByClassName("firstpage")[0];
  let page2 = document.getElementsByClassName("secondpage")[0];
  page1.style.display = (page1.style.display == "none") ? "block" : "none";
  page2.style.display = (page1.style.display == "none") ? "block" : "none";
}

const WaitingListForm = () => {
  const [districtValue, setDistrictValue] = React.useState("Belagavi");

  const onDistrictChange = (event) => {
    const value = event.target.value;
    setDistrictValue(value);
  };

  const onRadioChange = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
    console.log(newData);
  }

  const onConditionChange = (e) => {
    const copy = { ...data };
    if (e.target.checked) {
      copy.conditions.push(e.target.value);
      setData(copy);
    } else {
      copy.conditions = copy.conditions.filter((value) => value !== e.target.value);
      setData(copy);
    }
    console.log(data.conditions);
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

  function calculate_age(dateString) {
    var birthday = +new Date(dateString);
    return ~~((Date.now() - birthday) / 31557600000);
  }

  const redirectOnSuccess = () => {
    router.push("/waitinglist");
    return "";
  };

  async function handleSubmit(e) {
    e.preventDefault();
    let age = await calculate_age(data.dob);
    g_age = age;
    const result = await axios
      .post("/api/form", {
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
        height: data.height,
        weight: data.weight,
        bmi: data.bmi,
        bloodtype: data.bloodtype,
        primarydoc: data.primarydoc,
        hospital: data.hospital,
        conditions: data.conditions,
        regfee: data.regfee,
        aadhaar: data.aadhaar,
        age: age,
      })
    console.log(result?.data?.url)
    // .then(async (res) => {
    //   console.log(res.data.url);
    //   //console.log(signer.address)
    const txnPromise = listPatient(result.data.url, data.fname + " " + data.lname, g_age, data.organs, data.bloodtype)

    toast.promise(txnPromise, {
      loading: "Processing...",
      success: () => `Transaction successful` + redirectOnSuccess(),
      error: "Error when fetching",
    });

    const txn = await txnPromise
    console.log(txn);
    // });
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
    height: "",
    weight: "",
    bmi: "",
    bloodtype: "",
    primarydoc: "",
    hospital: "",
    conditions: [],
    regfee: "",
    aadhaar: "",
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
      <div className="flex w-[40%] justify-center">
        <div>
          {/* <!-- component --> */}
          <div className="flex mx-auto w-full h-full relative z-[-1]">
            <div className="relative wrap overflow-hidden p-10 h-full">
              <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border left-[50%]"></div>
              {/* <!-- 1st timeline --> */}
              <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                <div className="order-1 w-5/12"></div>
                <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                  <h1 className="mx-auto text-white font-semibold text-lg">
                    1
                  </h1>
                </div>
                <div className="order-1 bg-gray-800 rounded-lg shadow-2xl w-5/12 px-6 py-4 ">
                  <h3 className="mb-3 font-bold text-gray-100 text-l">
                    Doctor&apos;s Evaluation
                  </h3>
                  <p className="text-sm leading-snug tracking-wide text-gray-300 text-opacity-100">
                    The process begins when a patient is referred to a
                    transplant center by their healthcare provider. The patient
                    undergoes a comprehensive evaluation, including medical
                    tests, imaging scans, and consultations with various
                    specialists, to determine their eligibility for
                    transplantation.
                  </p>
                </div>
              </div>

              {/* <!-- 2nd timeline --> */}
              <div className="mb-8 flex justify-between items-center w-full left-timeline">
                <div className="order-1 w-5/12"></div>
                <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                  <h1 className="mx-auto text-white font-semibold text-lg">
                    2
                  </h1>
                </div>
                <div className="order-1 bg-cyan-600 rounded-lg shadow-2xl w-5/12 px-6 py-4">
                  <h3 className="mb-3 font-bold text-white text-lg">
                    Add Patient to Waiting list
                  </h3>
                  <p className="text-sm leading-snug tracking-wide text-white text-opacity-100">
                    {" "}
                    If the patient meets the criteria for transplantation, they
                    are placed on the national or regional organ transplant
                    waiting list. Organ allocation is determined based on
                    factors such as medical urgency, blood type compatibility,
                    organ size, and waiting time.
                  </p>
                </div>
              </div>
              {/* <!-- 3rd timeline --> */}

              <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                <div className="order-1 w-5/12"></div>
                <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                  <h1 className="mx-auto text-white font-semibold text-lg">
                    3
                  </h1>
                </div>
                <div className="order-1 bg-gray-800 rounded-lg shadow-2xl w-5/12 px-6 py-4">
                  <h3 className="mb-3 font-bold text-gray-100 text-l">
                    Priority List Generation
                  </h3>
                  <p className="text-sm leading-snug tracking-wide text-gray-300 text-opacity-100">
                    When a suitable organ becomes available, the transplant
                    center evaluates the offer based on compatibility and the
                    patient&apos;s medical condition. A priority list is
                    generated.{" "}
                  </p>
                </div>
              </div>
              {/* <!-- 4th timeline --> */}
              <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                <div className="order-1 w-5/12"></div>
                <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                  <h1 className="mx-auto text-white font-semibold text-lg">
                    4
                  </h1>
                </div>
                <div className="order-1 bg-gray-800 rounded-lg shadow-2xl w-5/12 px-6 py-4">
                  <h3 className="mb-3 font-bold text-gray-100 text-l">
                    Doctor authorizes transplant{" "}
                  </h3>
                  <p className="text-sm leading-snug tracking-wide text-gray-300 text-opacity-100">
                    {" "}
                    the patient undergoes pre-transplant preparations, which may
                    include additional medical tests, preoperative
                    consultations, and discussions about the procedure, risks,
                    and post-transplant care
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="font-bold w-[60%] flex flex-col justify-center">
        <h1 className="flex justify-center text-3xl tracking-tight uppercase pb-10 px-auto">
          Patient Waiting List Form
        </h1>
        {/* <form action='/api/form' method='post' className="w-full max-w-lg"> */}
        <div className="flex justify-center">
          <form onSubmit={(e) => handleSubmit(e)} className="w-full max-w-2xl">
            <div className="firstpage">
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
                    placeholder="Sinwan"
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
                    placeholder="Imtiaz"
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
                <div className="w-full md:w-1/3 px-3">
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
                </div>
                <div className="w-full md:w-1/3 px-3">
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
                  />
                </div>
                <div className="w-full md:w-1/3 px-3">
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
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/3 px-3">
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
                </div>
                <div className="w-full md:w-1/3 px-3">
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
                </div>
                <div className="w-full md:w-1/3 px-3">
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
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/3 px-3">
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
                    placeholder="v@darsh.com"
                  />
                </div>
                <div className="w-full md:w-1/3 px-3">
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
                </div>
                <div className="w-full md:w-1/3 px-3">
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
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
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
                    className="appearance-none block w-full py-3 px-4 leading-tight bg-gray-500 hover:bg-slate-800 text-white font-base rounded"
                  >
                    Get OTP
                  </button>
                </div>
              </div>
              <p className="text-2xl font-bold tracking-tight text-gray-900">
                Organs Required
              </p>
              <hr className="w-52 h-1 my-2 bg-gray-100 border-0 rounded md:my-2 dark:bg-gray-700"></hr>

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
                  className="appearance-none block w-full py-3 px-4 leading-tight bg-[#4b42f5] hover:bg-[#009AF3] text-[#f4f7fb] font-extrabold text-2xl rounded"
                  type="button"
                  onClick={togglePage}
                >
                  Next
                </button>
              </div>
            </div>
            <div className="secondpage" style={{ display: "none" }}>
              <p className="text-2xl font-bold tracking-tight text-gray-900">
                Patient Details
              </p>
              <hr className="w-52 h-1 my-2 bg-gray-100 border-0 rounded md:my-2 dark:bg-gray-700"></hr>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/3 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="height"
                  >
                    Height(cm)
                  </label>
                  <input
                    onChange={(e) => handle(e)}
                    id="height"
                    value={data.height}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="number"
                    min="1"
                    max="200"
                    placeholder="300"
                  />
                </div>
                <div className="w-full md:w-1/3 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="weight"
                  >
                    Weight(kg)
                  </label>
                  <input
                    onChange={(e) => handle(e)}
                    id="weight"
                    value={data.weight}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="number"
                    min="0"
                    max="500"
                    step="0.1"
                    placeholder="74.6"
                  />
                </div>
                <div className="w-full md:w-1/3 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="bmi"
                  >
                    BMI
                  </label>
                  <input
                    onChange={(e) => handle(e)}
                    id="bmi"
                    value={data.bmi}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="number"
                    min="10"
                    max="50"
                    step="0.1"
                    placeholder="24.5"
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/3 px-3">
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
                <div className="w-full md:w-1/3 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="primarydoc"
                  >
                    Primary Doctor
                  </label>
                  <input
                    onChange={(e) => handle(e)}
                    id="primarydoc"
                    value={data.primarydoc}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Abhinav G"
                  />
                </div>
                <div className="w-full md:w-1/3 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="hospital"
                  >
                    Hospital
                  </label>
                  <input
                    onChange={(e) => handle(e)}
                    id="hospital"
                    value={data.hospital}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Koshys"
                  />
                </div>
              </div>
              <p className="text-2xl font-bold tracking-tight text-gray-900">
                Condition Checklist
              </p>
              <hr className="w-52 h-1 my-2 bg-gray-100 border-0 rounded md:my-2 dark:bg-gray-700"></hr>

              <div className="flex flex-wrap -mx-3 mb-6 mt-6">
                <div className="w-full px-3 md:mb-0">
                  <input
                    onChange={onConditionChange}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0"
                    value="hla"
                  />
                  <label className="ml-2 mb-0.5 text-base font-medium">
                    Human leukocyte antigen(HLA)
                  </label>
                </div>
                <div className="w-full px-3 md:mb-0">
                  <input
                    onChange={onConditionChange}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0"
                    value="angina"
                  />
                  <label className="ml-2 mb-0.5 text-base font-medium">
                    Angina
                  </label>
                </div>
                <div className="w-full px-3 md:mb-0 ">
                  <input
                    onChange={onConditionChange}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0"
                    value="hypertension"
                  />
                  <label className="ml-2 mb-0.5 text-base font-medium">
                    Hypertension
                  </label>
                </div>
                <div className="w-full px-3 md:mb-0">
                  <input
                    onChange={onConditionChange}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0"
                    value="cva"
                  />
                  <label className="ml-2 mb-0.5 text-base font-medium">
                    Cerebrovascular accident
                  </label>
                </div>
                <div className="w-full px-3 md:mb-0">
                  <input
                    onChange={onConditionChange}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0"
                    value="pvd"
                  />
                  <label className="ml-2 mb-0.5 text-base font-medium">
                    Peripheral Vascular disease
                  </label>
                </div>
                <div className="w-full px-3 md:mb-0">
                  <input
                    onChange={onConditionChange}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0"
                    value="copd"
                  />
                  <label className="ml-2 mb-0.5 text-base font-medium">
                    Chronic obstructive pulmonary disease
                  </label>
                </div>
                <div className="w-full px-3 md:mb-0">
                  <input
                    onChange={onConditionChange}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0"
                    value="premalignancy"
                  />
                  <label className="ml-2 mb-0.5 text-base font-medium">
                    Previous malignancy
                  </label>
                </div>
                <div className="w-full px-3 md:mb-0">
                  <input
                    onChange={onConditionChange}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0"
                    value="dvtpe"
                  />
                  <label className="ml-2 mb-0.5 text-base font-medium">
                    Recent DVT/PE
                  </label>
                </div>
                <div className="w-full px-3 md:mb-0">
                  <input
                    onChange={onConditionChange}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0"
                    value="hbsag"
                  />
                  <label className="ml-2 mb-0.5 text-base font-medium">
                    HbsAg
                  </label>
                </div>
                <div className="w-full px-3 md:mb-0">
                  <input
                    onChange={onConditionChange}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0"
                    value="hepatitisc"
                  />
                  <label className="ml-2 mb-0.5 text-base font-medium">
                    Hepatitis C
                  </label>
                </div>
                <div className="w-full px-3 md:mb-0">
                  <input
                    onChange={onConditionChange}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0"
                    value="hiv"
                  />
                  <label className="ml-2 mb-0.5 text-base font-medium">
                    HIV
                  </label>
                </div>
              </div>
              <div className="flex">
                <div className="w-full md:w-1/2 pr-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="regfee"
                  >
                    Resistration Fees Paid
                  </label>
                  <input
                    onChange={(e) => handle(e)}
                    id="regfee"
                    value={data.regfee}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="number"
                    min="1"
                    step="0.01"
                    placeholder="500.00"
                  />
                </div>
                <div className="w-full md:w-1/2 pr-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="aadhaar"
                  >
                    Aadhaar Card Number
                  </label>
                  <input
                    onChange={(e) => handle(e)}
                    id="aadhaar"
                    value={data.aadhaar}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="12345657890"
                  />
                </div>
              </div>
              <div className="flex">
                <div className="mb-6 mt-10 w-1/2 mr-0.5">
                  <button
                    className="appearance-none block w-full py-3 px-4 leading-tight bg-[#4b42f5] hover:bg-[#009AF3] text-[#f4f7fb] font-extrabold text-2xl rounded duration-200"
                    type="button"
                    onClick={togglePage}
                  >
                    Back
                  </button>
                </div>
                <div className="mb-6 mt-10 w-1/2 ml-0.5">
                  <button
                    className="appearance-none block w-full py-3 px-4 leading-tight bg-green-500 hover:bg-green-400 text-[#f4f7fb] font-extrabold text-2xl rounded duration-200"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WaitingListForm;
