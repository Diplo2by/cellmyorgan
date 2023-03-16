import Head from "next/head";
import Nav from "@/components/Nav";
import Image from "next/image";
import Heart from "../../../public/images/heart.avif"

function About() {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <Nav></Nav>
      <div />
      <div className="py-16 bg-white">
        <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
          <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
            <div className="w-1/2 md:5/12 lg:w-3/12">
              <Image src={Heart} alt="image" loading="lazy" />
            </div>
            <div className="md:7/12 lg:w-6/12">
              <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                About cellmyorgan
              </h2>
              <p className="mt-6 text-gray-800">
                The Jeevasarthakathe has been constituted by the Government of
                Karnataka for a sustained deceased donor (Cadaver)
                transplantation programme in the state of Karnataka.
                Jeevasarthakathe is the body appointed to oversee the
                implementation of the Transplantation of Human Organs Act of
                1994. The organization aims to coordinate the deceased donor
                transplantation activities and also educate the public on organ
                donation. The functions of Jeevasarthakathe include, involving
                the hospitals for active participation of the deceased donor
                (Cadaver) program through promotional activities, seminars,
                workshops and educational programmes. The public awareness
                programme takes place through hospitals, educational
                institutions, corporates and non-governmental organizations
                along with media participation.
              </p>
              <p className="mt-4 text-gray-800">
                The <b>mission</b> of Jeevasarthakathe is:
              </p>
              <ul class="space-y-1 text-gray-800 list-disc list-inside dark:text-gray-800">
                <li>
                  To establish effective deceased donor (cadaver) organ procurement and just distribution of organs.
                </li>
                <li>
                  To set up organ sharing by minimizing wastage of organs.
                </li>
                <li>
                  To assure quality control by collection, analysis and publications of data on organ donation, procurement and transplantation.
                </li>
                <li>To increase public awareness.</li>
              </ul>
              <p className="mt-4 text-gray-800">
                Jeevasarthakathe works through a team effort of participating
                hospitals for the achievement of a sustained cadaveric
                transplant programme. Jeevasarthakathe will be entirely
                responsible for managing the Karnataka State Organ and Tissue
                Sharing System and any other activity entrusted to it by the
                Health and Family Welfare Department of the State Government.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
