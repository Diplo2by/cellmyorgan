import Web3Modal from "web3modal";
import React, { useState } from "react"
import axios from "axios"
import { ethers } from "ethers";
import taluk from "../../json/data.json"
import { resolve } from "styled-jsx/css"
import { organAddress, organListingAddress } from 'config'
import Organ from '../../artifacts/contracts/Organ.sol/Organ.json'
import OrganListing from '../../artifacts/contracts/OrganListing.sol/OrganListing.json'

import {
	MainFormElement,
	DropdownFormElement,
	InputFormElement,
} from "./FormElements"

async function listOrgan(organs, url, signer) {
	try {
		let organ = new ethers.Contract(organAddress, Organ.abi, signer)
		let transaction = await organ.createToken(url)
		let tx = await transaction.wait()

		let event = tx.events[0]
		let value = event.args[2]
		let tokenId = Number(value)	
		//console.log(tokenId)

		let contract = new ethers.Contract(organListingAddress, OrganListing.abi, signer);
		transaction = await contract.ListOrgan(organAddress,tokenId, organs[0], 'C+',url);
		await transaction.wait()
		transaction = await contract.fetchOrganItems();
		return(transaction)
	}
	catch (e) {
		console.log('imma start cryin frfr')
		console.log(e)
	}

}

const RegistrationForm = () => {
	const [districtValue, setDistrictValue] = React.useState("Belagavi")
	const onDistrictChange = (event) => {
		const value = event.target.value
		setDistrictValue(value)
	}
	const onOrganChange = (e) => {
		const copy = { ...data }
		if (e.target.checked) {
			copy.organs.push(e.target.value)
			setData(copy)
		} else {
			copy.organs = copy.organs.filter(
				(value) => value !== e.target.value
			)
			setData(copy)
		}
		console.log(data.organs)
	}

	// const [photo, setImage] = useState('')
	const onImageChange = async (e) => {
		let base64 = await convertBase64(e.target.files[0])
		// setImage(base64);
		const copy = { ...data }
		copy.photo = base64
		setData(copy)
		// console.log(photo);
	}

	const convertBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader()
			fileReader.readAsDataURL(file)
			fileReader.onload = () => {
				resolve(fileReader.result)
			}

			fileReader.onerror = (err) => {
				reject(err)
			}
		})
	}

	async function handleSubmit(e) {
		e.preventDefault()
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
			})
			.then(async (res) => {
				// console.log(res.data.url)
				const web3modal = new Web3Modal();
				const conn = await web3modal.connect();
				const provider = new ethers.providers.Web3Provider(conn);
				const signer = provider.getSigner();
				const txn = await listOrgan(data.organs,res.data.url, signer)
				console.log(txn)
			})
	}

	const [data, setData] = useState({
		fname: "",
		lname: "",
		address: "",
		sex: "",
		dob: "",
		height: "",
		weight: "",
		bmi: "",
		blood_group: "",
		hla: "",
		angina: "",
		hypertension: "",
		cva: "",
		peripheral_v_disease: "",
		copd: "",
		previous_malignancy: "",
		recent_dvt_pe: "",
		hbs_ag: "",
		hepatitis_c: "",
		hiv: "",
		primary_doctor: "",
		hospital: "",
		aadhar: "",
		phone_no: "",
		city: "",
		zip: "",
		district: districtValue,
		taluk: "",
		email: "",
		emgmob: "",
		mob: "",
		photo: "",
		organs: [],
	})

	async function handle(e) {
		const newData = { ...data }
		newData[e.target.id] = e.target.value
		setData(newData)
		console.log(newData)
	}

	return (
		<div className="font-bold items-center flex flex-col h-screen my-auto">
			<h1 className="pb-10">Donor Registration Card</h1>
			{/* <form action='/api/form' method='post' className="w-full max-w-lg"> */}
			<form
				onSubmit={(e) => handleSubmit(e)}
				className="w-full max-w-lg">
				<p className="text-2xl font-bold tracking-tight text-gray-900">
					Personal Details
				</p>
				<hr className="w-52 h-1 my-2 bg-gray-100 border-0 rounded md:my-2 dark:bg-gray-700"></hr>
				<div className="flex flex-wrap -mx-3 mb-6 mt-6">
					<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<label
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							htmlFor="fname">
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
							htmlFor="lname">
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
							htmlFor="address">
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
							htmlFor="sex">
							Sex
						</label>
						<div className="relative">
							<select
								onChange={(e) => handle(e)}
								id="sex"
								value={data.sex}
								className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
								<option>Male</option>
								<option>Female</option>
								<option>Other</option>
							</select>
							<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
								<svg
									className="fill-current h-4 w-4"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20">
									<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
								</svg>
							</div>
						</div>
					</MainFormElement>
					<MainFormElement>
						<label
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							htmlFor="dob">
							Date Of Birth
						</label>
						<input
							onChange={(e) => handle(e)}
							id="dob"
							value={data.dob}
							className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-3 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							type="date"
						/>
					</MainFormElement>
					<MainFormElement>
						<label
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							htmlFor="city">
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
							htmlFor="zip">
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
							htmlFor="district">
							District
						</label>
						<div className="relative">
							<select
								onChange={(e) => {
									handle(e)
									onDistrictChange
								}}
								id="district"
								value={data.district}
								className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 mb-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
								<option
									defaultValue
									disabled>
									Select District
								</option>
								{Object.keys(taluk).map((key) => (
									<option
										key={key}
										value={key}>
										{key}
									</option>
								))}
							</select>
							<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
								<svg
									className="fill-current h-4 w-4"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20">
									<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
								</svg>
							</div>
						</div>
					</MainFormElement>
					<MainFormElement>
						<label
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							htmlFor="taluk">
							Taluk
						</label>
						<div className="relative">
							<select
								onChange={(e) => handle(e)}
								id="taluk"
								value={data.taluk}
								className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
								<option
									defaultValue
									disabled>
									Select Taluk
								</option>
								{taluk[data.district].Taluk.map((key) => (
									<option
										key={key}
										value={key}>
										{key}
									</option>
								))}
							</select>
							<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
								<svg
									className="fill-current h-4 w-4"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20">
									<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
								</svg>
							</div>
						</div>
					</MainFormElement>
				</div>

				<div className="flex flex-wrap -mx-3 mb-6">
					<MainFormElement>
						<label
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							htmlFor="email">
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
					</MainFormElement>
					<MainFormElement>
						<label
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							htmlFor="emgmob">
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
							htmlFor="mob">
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
				<div className="flex flex-wrap -mx-3 mb-6">
					<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<label
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							htmlFor="photo">
							Photo
						</label>
						<input
							onChange={(e) => {
								onImageChange(e)
							}}
							className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							type="file"
						/>
					</div>
					<div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
						<label
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							htmlFor="grid-zip">
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
							className="appearance-none block w-full py-3 px-4 leading-tight bg-gray-500 hover:bg-slate-800 text-white font-base rounded">
							Get OTP
						</button>
					</div>
				</div>
				<p className="text-2xl font-bold tracking-tight text-gray-900">
					Organs to donate
				</p>
				<hr className="w-52 h-1 my-2 bg-gray-100 border-0 rounded md:my-2 dark:bg-gray-700"></hr>

				<div className="flex flex-wrap -mx-3 mb-6 mt-6">
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
						<label className="ml-2 mb-0.5 text-base font-medium">
							Liver
						</label>
					</div>
					<div className="w-full md:w-1/3 px-3 md:mb-0">
						<input
							onChange={onOrganChange}
							type="checkbox"
							className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0"
							value="lung"
						/>
						<label className="ml-2 mb-0.5 text-base font-medium">
							Lungs
						</label>
					</div>
					<div className="w-full md:w-1/3 px-3 md:mb-0">
						<input
							onChange={onOrganChange}
							type="checkbox"
							className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0"
							value="kidney"
						/>
						<label className="ml-2 mb-0.5 text-base font-medium">
							Kidneys
						</label>
					</div>
					<div className="w-full md:w-1/3 px-3 md:mb-0">
						<input
							onChange={onOrganChange}
							type="checkbox"
							className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0"
							value="heart"
						/>
						<label className="ml-2 mb-0.5 text-base font-medium">
							Heart
						</label>
					</div>
				</div>
				<div className="flex flex-wrap -mx-3 mb-6 mt-10">
					<button
						className="appearance-none block w-full py-3 px-4 leading-tight bg-green-600 hover:bg-green-900 text-white font-bold text-2xl rounded"
						type="submit">
						Submit
					</button>
				</div>
			</form>
		</div>
	)
}

export default RegistrationForm
