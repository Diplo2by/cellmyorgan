import React from "react";
import Head from "next/head";
import article from "@/components/Article";
import Article from "@/components/Article";

const events = () => {
  return (
    <div>
      <Head>
        <title>Events and Updates</title>
      </Head>
      <div className="bg-white py-10 sm:py-15">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Events and Updates
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Read the latest news releases and articles from the Organ
              Procurement & Transplantation Network below:
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <Article
              title={"Donors for Kidney required"}
              author={"Samwell Dinesh"}
              authorRole={"Health Minister Karnataka"}
              date={"March 28 2023"}
              category={"Announcements"}
              link={"#"}
            />
            <Article
              title={"Number of donations reach an all time high"}
              author={"Dr. Gopal"}
              authorRole={"Senior Surgeon"}
              date={"April 1 2023"}
              category={"News & Updates"}
              link={"#"}
            />
            <Article
              title={"Campaigns to Increase Organ donation awareness"}
              author={"Dr. Ramesh"}
              authorRole={"Medical Consultant"}
              date={"May 10 2023"}
              category={"News & Updates"}
              link={"#"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default events;
