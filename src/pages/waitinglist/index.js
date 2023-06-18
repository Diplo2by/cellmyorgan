import Head from "next/head";
import WaitingTabular from "@/components/WaitingTabular";

function WaitingList() {
  return (
    <>
      <Head>
        <title>Waiting List</title>
      </Head>
      <div className="flex flex-col justify-center h-screen">
        <WaitingTabular />
      </div>
    </>
  );
}

export default WaitingList;
