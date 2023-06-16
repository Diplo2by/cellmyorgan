import Head from "next/head";
import { signOut } from "next-auth/react";
import Link from "next/link";

function AdminPage() {
  return (
    <>
        <div className="h-screen">
            <Head>
                <title>Registration Page</title>
            </Head>
            <h1 className="font-bold text-6xl">YOU HAVE REACHED THE ADMIN PAGE</h1>
             <Link className="btn btn-primary" href="/">
            Go to Index Page
          </Link>
          <button
            className="bg-black text-white p-6"
            onClick={() => signOut()}
          >Sign OUT</button>
        </div>
    </>
  );
}



export default AdminPage;
