import React, { useState } from "react";
import Link from "next/link";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
async function connectWallet() {
  try {
    const web3modal = new Web3Modal();
    const conn = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(conn);
    const signer =provider.getSigner();
    console.log("Connection successfull Signer");
  } catch (e) {
    console.log(e);
  }
}

const Nav = () => {
  let Links = [
    { name: "HOME", link: "/" },
    { name: "ABOUT", link: "/about" },
    { name: "EVENTS", link: "/events" },
    { name: "GALLERY", link: "/gallery" },
    { name: "CONTACT", link: "/contact" },
    { name: "FAQs", link: "/faq" },
  ];
  let [open, setOpen] = useState(false);
  return (
    <div className="shadow-md w-full sticky top-0 left-0 z-9999">
      <div className="md:flex items-center justify-between bg-gray-400 py-4 md:px-10 px-7">
        <div className="font-bold text-3xl cursor-pointer flex items-center text-gray-800">
          donorblock.
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <ion-icon name={open ? "close" : "menu"}></ion-icon>
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white-400 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? "top-20 " : "top-[-490px]"
            }`}
        >
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
              <Link
                href={link.link}
                className="text-gray-800 hover:text-gray-200 duration-500"
              >
                {link.name}
              </Link>
            </li>
          ))}
          {/* <Button onClick={event =>  window.location.href='/register'}> */}
          {/* </Button> */}
          <button className="bg-gray-800 text-white py-2 px-6 rounded md:ml-8 hover:bg-gray-600 duration-200 font-bold text-lg">
            <Link href="/register">Register now to be a Donor</Link>
          </button>
          <button
            onClick={connectWallet}
            className="bg-gray-800 text-white py-2 px-6 rounded md:ml-8 hover:bg-gray-600 duration-200 font-bold text-lg"
          >
            Connect Wallet
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
