import Web3Modal from "web3modal";
import React, { useState } from "react";
import axios from "@/pages/api/axios";
import { ethers } from "ethers";
import taluk from "../../json/data.json";
import { patientAddress } from "config";
import Patient from "../../artifacts/contracts/Patient.sol/Patient.json"

import {
  MainFormElement,
  DropdownFormElement,
  InputFormElement,
} from "./FormElements";

async function listPatient(url,name,age,organType) {
  try {
    const web3modal = new Web3Modal();
    const conn = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(conn);
    const signer = provider.getSigner();
    const patientContract = new ethers.Contract(patientAddress, Patient.abi, signer)
    let transaction = await patientContract.listNewPatient(signer.getAddress(), url,name,age,organType)
    await transaction.wait()
    let txn = await patientContract.getAllAddress();
    return (txn);
  }
  catch (e) {
    console.log('Imma cri')
    console.log(e)
  }
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

  async function handleSubmit(e) {
    e.preventDefault();
    var age = await calculate_age(data.dob);
    axios
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
      .then(async (res) => {
        console.log(res.data.url);
        //console.log(signer.address)
        const transac = await listPatient(
          res.data.url,
          data.fname + data.lname,
          "69",
          data.organs
        );
        console.log(transac);
      });
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
    <div className="font-bold items-center flex flex-col h-auto my-auto mt-auto">
      <h1 className="pt-10">Waiting List Form</h1>
      {/* <form action='/api/form' method='post' className="w-full max-w-lg"> */}
      <form onSubmit={(e) => handleSubmit(e)} className="w-full max-w-lg">
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
              <label className="ml-2 mb-0.5 text-base font-medium">Liver</label>
            </div>
            <div className="w-full md:w-1/3 px-3 md:mb-0">
              <input
                onChange={onRadioChange}
                type="radio"
                className="w-4 h-4 text-gray-800 border-gray-300 focus:ring-2 focus:ring-gray-300"
                value="lung"
                name="organs"
              />
              <label className="ml-2 mb-0.5 text-base font-medium">Lungs</label>
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
              <label className="ml-2 mb-0.5 text-base font-medium">Heart</label>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6 mt-10">
            <button
              className="appearance-none block w-full py-3 px-4 leading-tight bg-cyan-600 hover:bg-cyan-900 text-white font-bold text-2xl rounded"
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
              <label className="ml-2 mb-0.5 text-base font-medium">HbsAg</label>
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
              <label className="ml-2 mb-0.5 text-base font-medium">HIV</label>
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
                className="appearance-none block w-full py-3 px-4 leading-tight bg-cyan-600 hover:bg-cyan-900 text-white font-bold text-2xl rounded"
                type="button"
                onClick={togglePage}
              >
                Back
              </button>
            </div>
            <div className="mb-6 mt-10 w-1/2 ml-0.5">
              <button
                className="appearance-none block w-full py-3 px-4 leading-tight bg-green-600 hover:bg-green-900 text-white font-bold text-2xl rounded"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WaitingListForm;
