import React from "react";
import Typed from "react-typed";
import Link from "next/link";


const Hero = () => {
  return (
    <div className="">
      <div className="max-w-[800px] mt-[-96px] w-full h-[103vh] mx-auto text-center flex flex-col justify-center lg:pt-[150px]">
        {/* <p className="text-[#00df9a] font-bold p-2">
          GROWING WITH DATA ANALYTICS
        </p> */}
        <h1 className="md:text-5xl sm:text-4xl text-3xl font-bold md:py-6">
          Welcome to Indian Organ Procurement and Transplantaion portal - IOPTN
        </h1>
        <div className="flex justify-center items-center w-max relative -left-9">
          <p className="md:text-4xl sm:text-2xl text-xl font-bold py-4">
            IOPTN has so far facilitated :
          </p>
          <Typed
            className="md:text-4xl sm:text-2xl text-xl font-extrabold ml-2 text-[#720ac7]"
            strings={[
              "100+ Procurements.",
              "85+ Transplantations.",
              "100+ Hospitals",
              "Countless Happy Patients.",
            ]}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
        <p className="md:text-2xl text-xl font-bold opacity-80 py-5">
          Indian Organ Procurement and Transplantation Network is a unique
          public-private partnership that links all professionals involved in
          the Indian donation and transplantation system.
        </p>
        <Link href="/login">
          <button className="bg-[#4b42f5] hover:bg-[#009AF3] text-[#f4f7fb] w-[200px] rounded-md font-extrabold my-6 mx-auto py-3 text-xl duration-200">
            Doctor Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
