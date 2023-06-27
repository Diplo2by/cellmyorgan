import React from "react";
import Typed from "react-typed";

const Hero = () => {
  return (
    <div className="text-gray-800">
      <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center lg:pt-[150px]">
        {/* <p className="text-[#00df9a] font-bold p-2">
          GROWING WITH DATA ANALYTICS
        </p> */}
        <h1 className="md:text-5xl sm:text-4xl text-3xl font-bold md:py-6">
          Welcome to Indian Organ Procurement and Transplantaion portal(IOPTN)
        </h1>
        <div className="text-gray-700 flex justify-center items-center">
          <p className="md:text-4xl sm:text-2xl text-xl font-bold py-4">
            Donatable organs include :
          </p>
          <Typed
            className="md:text-4xl sm:text-2xl text-xl font-bold md:pl-4 pl-2"
            strings={[
              "LIVER",
              "KIDNEY",
              "HEART",
              "LUNGS",
              "PANCREAS",
              "CORNEA",
            ]}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
        <p className="md:text-2xl text-xl font-bold text-gray-500 py-5">
          More than 100,000 people are waiting for a lifesaving transplant.
          Transplants rely on the generosity of organ, eye and tissue donors,
          and there are not enough donors to meet the need. You can help.
        </p>
        <button className="bg-gray-800 w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-white text-xl">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;
