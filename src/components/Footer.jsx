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
  //   return (
  //     <div className="max-w-screen mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300 bg-slate-900">
  //       <div>
  //         <h1 className="w-full text-3xl font-bold text-white">donorblock.</h1>
  //         <p className="py-4">
  //           Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id odit
  //           ullam iste repellat consequatur libero reiciendis, blanditiis
  //           accusantium.
  //         </p>
  //         <div className="flex justify-between md:w-[75%] my-6">
  //           <FaFacebookSquare size={30} />
  //           <FaInstagram size={30} />
  //           <FaTwitterSquare size={30} />
  //           <FaGithubSquare size={30} />
  //           <FaDribbbleSquare size={30} />
  //         </div>
  //       </div>
  //       <div className="lg:col-span-2 flex justify-between mt-6">
  //         <div>
  //           <h6 className="font-medium text-gray-400">Solutions</h6>
  //           <ul>
  //             <li className="py-2 text-sm">Analytics</li>
  //             <li className="py-2 text-sm">Marketing</li>
  //             <li className="py-2 text-sm">Commerce</li>
  //             <li className="py-2 text-sm">Insights</li>
  //           </ul>
  //         </div>
  //         <div>
  //           <h6 className="font-medium text-gray-400">Support</h6>
  //           <ul>
  //             <li className="py-2 text-sm">Pricing</li>
  //             <li className="py-2 text-sm">Documentation</li>
  //             <li className="py-2 text-sm">Guides</li>
  //             <li className="py-2 text-sm">API Status</li>
  //           </ul>
  //         </div>
  //         <div>
  //           <h6 className="font-medium text-gray-400">Company</h6>
  //           <ul>
  //             <li className="py-2 text-sm">About</li>
  //             <li className="py-2 text-sm">Blog</li>
  //             <li className="py-2 text-sm">Jobs</li>
  //             <li className="py-2 text-sm">Press</li>
  //             <li className="py-2 text-sm">Careers</li>
  //           </ul>
  //         </div>
  //         <div>
  //           <h6 className="font-medium text-gray-400">Legal</h6>
  //           <ul>
  //             <li className="py-2 text-sm">Claim</li>
  //             <li className="py-2 text-sm">Policy</li>
  //             <li className="py-2 text-sm">Terms</li>
  //           </ul>
  //         </div>
  //       </div>
  //     </div>
  //   );
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link className="flex items-center" href="#">
              <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
                donorblock.
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Resources
              </h2>
              <ul className="text-gray-600 dark:text-gray-400 font-medium">
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
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Other
              </h2>
              <ul className="text-gray-600 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="#" className="hover:underline ">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Register
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-600 dark:text-gray-400 font-medium">
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
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <Link href="#" className="hover:underline">
              donorblock
            </Link>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <FaFacebookSquare size={20} />
              <span className="sr-only">Facebook page</span>
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <FaInstagram size={20} />
              <span className="sr-only">Instagram page</span>
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
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
