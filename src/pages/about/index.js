import React from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
const About = () => {
  return (
    <>
      <Head>
        <title>About US</title>
      </Head>
      <div className="">
        <div className="gap-16 items-center py-8 px-5 mx-auto max-w-screen-2xl lg:grid lg:grid-cols-2 lg:py-16 lg:pl-10">
          <div className="font-extrabold sm:text-lg">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold">
              About IOPTN
            </h2>
            <div className="mb-6 text-md font-normal">
              <b>Indian Organ Procurement and Transplantation Network</b>
              <br />
              <br />
              At IOPTN, we believe in the incredible power of organ donation to
              transform lives and create a lasting impact in society. Our
              mission is to raise awareness, educate, and facilitate the organ
              donation process in India, fostering a culture of giving and
              saving lives.
            </div>

            <p className="font-bold text-lg mb-2">What sets IOPTN apart:</p>
            <ul className="list-disc text-base font-normal">
              <li className="mb-4">
                <b>Accessibility</b>: We are committed to making organ donation
                accessible to everyone. Our platform provides a simple,
                intuitive interface that allows individuals to register as
                donors with just a few clicks. We also offer multilingual
                support to ensure inclusivity across diverse communities.
              </li>
              <li className="mb-4">
                <b>Education and Awareness</b>: We believe that knowledge is the
                key to overcoming misconceptions and increasing organ donation
                rates. We provide extensive educational resources, informative
                articles, and FAQs to empower individuals with accurate
                information about organ transplantation.
              </li>
              <li className="mb-4">
                <b>Privacy and Security</b>: We prioritize the privacy and
                security of our users`&apos;` information. We adhere to strict
                data protection protocols and maintain confidentiality
                throughout the registration and donation process.
              </li>
              <div className="border-gray-500 border-4 p-2 mb-4">
                <p className="font-bold text-lg mb-2 text-center">CREDITS</p>
                <b>Project mentor:</b> Dr. Nimrita Koul, Assistant Professor,
                REVA University
                <br />
                <b>Project developers:</b>
                <Link
                  href={"https://heydarsh.xyz"}
                  className="block px-4 py-2 text-sm hover:bg-gray-200"
                >
                  Mr. Darshan V, Student, REVA University
                </Link>
                <Link
                  href={"https://github.com/Mr-DJ/"}
                  className="block px-4 py-2 text-sm hover:bg-gray-200"
                >
                  Mr. Samuel D Jonathan, Student, REVA University
                </Link>
              </div>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <Image
              className="w-full rounded-lg"
              src="/images/heart1.jpg"
              alt="Heart Image"
              width="1000"
              height="1000"
            />
            <Image
              className="mt-10 w-full lg:mt-10 rounded-lg"
              src="/images/img.jpg"
              alt="office content 2"
              width={800}
              height={1000}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
