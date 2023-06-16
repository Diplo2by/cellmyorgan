import React, { useState, useContext } from "react";
import axios from "@/pages/api/axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";


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
    }
    if (result?.ok) {
      router.push(callbackUrl);
    }
  };

  return (
    <>
      <div class="flex items-center justify-center h-screen my-auto mb-auto">
        {!success ? (
          <h1 className="flex md:text-4xl sm:text-3xl text-2xl font-bold px-4">
            You are already logged in. Redirecting...
          </h1>
        ) : (
          <>
            <h1 className="flex md:text-4xl sm:text-3xl text-2xl font-bold px-4">
              Doctor Login
            </h1>
            <div class="h-[120px]  bg-gray-800 w-[6px]"></div>
            <form
              class="bg-[#798478ad] shadow-md rounded px-8 pt-6 pb-8 font-bold flex flex-col mx-4"
              onSubmit={handleSubmit}
            >
              <div class="mb-4">
                <label
                  class="block text-grey-darker text-sm font-bold mb-2"
                  for="username"
                >
                  Registration Number
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker focus:ring-0 focus:outline-none focus:border-gray-600"
                  id="regid"
                  type="text"
                  placeholder="KA0012"
                  value={regid}
                  onChange={(e) => setReg(e.target.value)}
                />
              </div>
              {/* <div class="mb-6">
            <label
              class="block text-grey-darker text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3  focus:ring-0 focus:outline-none focus:border-gray-600"
              id="password"
              type="password"
              placeholder="******************"
            />
            <p class="text-red text-xs italic">Please choose a password.</p>
          </div> */}
              <div class="flex items-center justify-between">
                <button
                  class="bg-gray-800 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Sign In
                </button>
                <a
                  class="inline-block align-baseline font-bold text-sm"
                  href="#"
                >
                  Forgot Details?
                </a>
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
