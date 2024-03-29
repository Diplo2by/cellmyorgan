import React, { useState, useContext } from "react";
import axios from "@/pages/api/axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";


const Login = () => {
  const [regid, setReg] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState('false');
  const router = useRouter();
  const callbackUrl = decodeURI((router.query?.callbackUrl) ?? "/");
  console.log(callbackUrl)
  // const [password, setPass] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(regid);
    const result = await signIn("credentials", {
      regid,
      callbackUrl: callbackUrl ?? "/",
      redirect: false,
    });
    if (result?.error) {
      setError(result.error);
      toast.error(result.error);
    }
    if (result?.ok) {
      toast.success("Logged in successfully");
      router.push(callbackUrl);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen my-auto mb-auto">
        <div>
          <Toaster
            position="bottom-right"
            reverseOrder={false}
            toastOptions={{
              success: {
                duration: 7000,
              },
              error: {
                duration: 7000,
              },
              style: {
                paddingTop: "40px",
                paddingBottom: "40px",
                paddingLeft: "20px",
                paddingRight: "20px",
                minWidth: "30%",
              },
            }}
            containerStyle={{
              fontSize: "23px",
            }}
          />
        </div>
        {!success ? (
          <h1 className="flex md:text-4xl sm:text-3xl text-2xl font-bold px-4">
            You are already logged in. Redirecting...
          </h1>
        ) : (
          <>
            <h1 className="flex md:text-4xl sm:text-3xl text-2xl font-extrabold px-4">
              Doctor Login
            </h1>
            <div className="h-[120px]  bg-gray-800 w-[6px]"></div>
            <form
              className="bg-[#ddd8c4] shadow-md rounded px-8 pt-6 pb-8 font-bold flex flex-col mx-4"
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <label
                  className="block text-grey-darker text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Registration Number
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker focus:ring-0 focus:outline-none focus:border-gray-600"
                  id="regid"
                  type="text"
                  placeholder="KA0012"
                  value={regid}
                  onChange={(e) => setReg(e.target.value)}
                />
              </div>
              {/* <div className="mb-6">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3  focus:ring-0 focus:outline-none focus:border-gray-600"
              id="password"
              type="password"
              placeholder="******************"
            />
            <p className="text-red text-xs italic">Please choose a password.</p>
          </div> */}
              <div className="flex items-center justify-between">
                <button
                  className="bg-[#5c5552] hover:bg-[#8f857d] duration-200 text-[#f4f7fb] font-extrabold py-2 px-4 rounded"
                  type="submit"
                >
                  Sign In
                </button>
                <Link
                  className="inline-block align-baseline font-bold text-sm"
                  href="#"
                >
                  Forgot Details?
                </Link>
              </div>
            </form>
            {!!error && <p className="text-error">ERROR: {error}</p>}
          </>
        )}
      </div>
    </>
  );
};

export default Login;
