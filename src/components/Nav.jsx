import React, { useState } from "react";
import Link from "next/link";
import DropDown from "./DropDown";
import { signOut, useSession } from "next-auth/react";

// import { ethers } from "ethers";
// import Web3Modal from "web3modal";
// async function connectWallet() {
//   try {
//     const web3modal = new Web3Modal();
//     const conn = await web3modal.connect();
//     const provider = new ethers.providers.Web3Provider(conn);
//     const signer = provider.getSigner();
//     console.log("Connection successfull Signer");
//   } catch (e) {
//     console.log(e);
//   }
// }


const Nav = (showConnect = false) => {
  let options = [
    {
      name: "View Organ Bank",
      href: "/organbank"
    },
    {
      name: "View Waiting List",
      href: "/waitinglist"
    },
    {
      name: "Login",
      href: "/login"
    },
  ];
  const { data: session } = useSession();
  let showSignOut = false;

  if(session?.user?.role == 'doctor') {
    options.unshift(
      {
        name: "Add Patient Organ",
        href: "/register",
      },
      {
        name: "Add Waiting List",
        href: "/doctor",
      }
    )
    options = Array.from(new Set(options));
    showSignOut = true;
    // setShowSignOut(true);
  } else showSignOut = false;

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
    <div className="shadow-md w-full sticky top-0 left-0 z-9999 bg-[#f4f7fb]">
      <div className="md:flex items-center justify-between py-4 md:px-10 px-7">
        <div className="font-bold text-3xl cursor-pointer flex items-center">
          <Link href="/">IOPTN</Link>
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <ion-icon name={open ? "close" : "menu"}></ion-icon>
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white-400 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
              <Link
                href={link.link}
                className="link-underline link-underline-black"
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li className="ml-7">
            <DropDown options={options} />
          </li>
          <button
            onClick={signOut}
            className="bg-[#c9184a] hover:bg-[#e5383b] text-[#f4f7fb] py-2 px-6 rounded md:ml-8 duration-200 font-extrabold text-lg"
            style={{ display: showSignOut ? "block" : "none" }}
          >
            Sign Out
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
