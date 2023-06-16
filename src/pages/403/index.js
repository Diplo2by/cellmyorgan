// pages/403.tsx
import { NextPage } from "next";
import Link from "next/link";
import React from "react";
// const Custom403: NextPage = {};
const Custom403 = () => {
  return (
    <div className="container">
      <div className="grid place-content-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="my-4 text-center">
            <h1 className="text-2xl">403 - Unauthorized</h1>
            <p className="">Please login as admin</p>
          </div>
          <Link className="bg-black text-white p-6" href="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Custom403;
