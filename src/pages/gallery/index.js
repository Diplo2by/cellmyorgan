/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";

const index = () => {
  return (
    <>
      <Head>
        <title>Gallery</title>
      </Head>
      <section className="overflow-hidden text-neutral-700">
        <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
          <div className="-m-1 flex flex-wrap md:-m-2">
            <div className="flex w-1/3 flex-wrap">
              <div className="w-full p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center hover:scale-110"
                  src="https://images.unsplash.com/photo-1593113630400-ea4288922497"
                />
              </div>
            </div>
            <div className="flex w-1/3 flex-wrap">
              <div className="w-full p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center hover:scale-110"
                  src="https://images.unsplash.com/photo-1591901206004-1b3cc4ffbe3c"
                />
              </div>
            </div>
            <div className="flex w-1/3 flex-wrap">
              <div className="w-full p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center hover:scale-110"
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c"
                />
              </div>
            </div>
            <div className="flex w-1/3 flex-wrap">
              <div className="w-full p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center hover:scale-110"
                  src="https://images.unsplash.com/photo-1504813184591-01572f98c85f"
                />
              </div>
            </div>
            <div className="flex w-1/3 flex-wrap">
              <div className="w-full p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center hover:scale-110"
                  src="https://images.unsplash.com/photo-1584515933487-779824d29309"
                />
              </div>
            </div>
            <div className="flex w-1/3 flex-wrap">
              <div className="w-full p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center hover:scale-110"
                  src="https://images.unsplash.com/photo-1538108149393-fbbd81895907"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
