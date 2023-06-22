import WaitingListForm from "@/components/WaitingListForm";
import Head from "next/head";
import { getSession } from "next-auth/react";

const WaitingList = () => {
  return (
    <>
      <Head>
        <title>Registration Page</title>
      </Head>
      <WaitingListForm />
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session || session.user.role != "doctor") {
    return {
      redirect: {
        destination: "/403",
        permanent: false,
      },
    };
  }
  console.log(session);
  return {
    props: { session },
  };
}

export default WaitingList;
