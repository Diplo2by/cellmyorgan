import React from "react";
import Image from "next/image";
import Head from "next/head";
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
              <b>Indian Organ Procurement and Transplantation
              Network</b>
              <br/>
              <br/>
              At IOPTN, we believe in the incredible power of organ donation to
              transform lives and create a lasting impact in society. Our
              mission is to raise awareness, educate, and facilitate the organ
              donation process in India, fostering a culture of giving and
              saving lives. About IOPTN: At IOPTN, we understand that organ
              transplantation is a life-saving procedure that can provide hope
              and a second chance to those in need. Unfortunately, in India, the
              demand for organs far outweighs the supply, leading to a
              significant gap and prolonged waiting periods for patients in
              need. Our platform aims to bridge this gap by connecting organ
              donors with individuals awaiting transplantation. Through our
              comprehensive and user-friendly website, we strive to simplify and
              streamline the organ donation process, making it easier for
              individuals to become donors and save lives.
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
              <li className="mb-4">
                <b>Community Engagement</b>: IOPTN aims to build a strong and
                supportive community of donors, recipients, and their families.
                We organize awareness campaigns, support groups, and events to
                foster connections and encourage dialogue around organ donation.
              </li>
              <li className="mb-4">
                <b>Collaboration</b>: We actively collaborate with hospitals,
                medical professionals, and NGOs to ensure a smooth and efficient
                organ donation process. By fostering partnerships, we can
                maximize the impact of our platform and create a network that
                benefits all stakeholders.
              </li>
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
