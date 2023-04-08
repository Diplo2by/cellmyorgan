import React from "react";

const Button = (props) => {
  return (
    <button className="bg-gray-800 text-white py-2 px-6 rounded md:ml-8 hover:bg-gray-600 duration-200">
      {props.children}
    </button>
  );
};

export default Button;
