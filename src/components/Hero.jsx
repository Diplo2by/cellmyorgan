import React from "react";
import Typed from "react-typed";
import Link from "next/link";


const Hero = () => {
  return (
    <div className="text-gray-800">
      <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center lg:pt-[150px]">
        {/* <p className="text-[#00df9a] font-bold p-2">
          GROWING WITH DATA ANALYTICS
        </p> */}
        <h1 className="md:text-5xl sm:text-4xl text-3xl font-bold md:py-6">
          Welcome to Indian Organ Procurement and Transplantaion portal - IOPTN
        </h1>
        <div className="text-gray-700 flex justify-center items-center w-max mr-12">
          <p className="md:text-4xl sm:text-2xl text-xl font-bold py-4">
            IOPTN has so far facilitated : 
          </p>
          <Typed
            className="md:text-4xl sm:text-2xl text-xl font-bold ml-2"
            strings={[
              '100+ Procurements.',
              '85+ Transplantations.',
              '100+ Registered hospitals',
              'Countless Happy Patients.'
            ]}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
        <p className="md:text-2xl text-xl font-bold text-gray-500 py-5">
          Indian Organ Procurement and Transplantation Network is a unique public-private partnership that links all professionals involved in the Indian donation and transplantation system.
        </p>
        <Link href='/login'>
          <button className="bg-gray-800 w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-white text-xl">
            Doctor Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
