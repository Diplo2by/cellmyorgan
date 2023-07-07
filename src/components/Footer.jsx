import React from "react";
import Link from "next/link";
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#021327]">
      <div className="text-[#f4f7fb] mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link className="flex items-center" href="#">
              <span className="self-center text-3xl font-semibold whitespace-nowrap">
                IOPTN
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">
                Resources
              </h2>
              <ul className="font-medium">
                <li className="mb-4">
                  <Link href="#" className="hover:underline">
                    Get Started
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Guidelines
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">Other</h2>
              <ul className="font-medium">
                <li className="mb-4">
                  <Link href="/" className="hover:underline ">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:underline">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">Legal</h2>
              <ul className="font-medium">
                <li className="mb-4">
                  <Link href="#" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm sm:text-center">
            © 2023{" "}
            <Link href="#" className="hover:underline">
              IOPTN
            </Link>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <Link href="#" className="hover:text-blue-300">
              <FaFacebookSquare size={20} />
              <span className="sr-only">Facebook page</span>
            </Link>
            <Link href="#" className="hover:text-blue-300">
              <FaInstagram size={20} />
              <span className="sr-only">Instagram page</span>
            </Link>
            <Link href="#" className="hover:text-blue-300">
              <FaTwitterSquare size={20} />
              <span className="sr-only">Twitter page</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
