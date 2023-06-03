import Head from "next/head";
import WaitingTabular from "@/components/WaitingTabular";

function WaitingList() {
  return (
    <>
      <Head>
        <title>Waiting List</title>
      </Head>
      <WaitingTabular/>
    </>
  );
}

export default WaitingList;
