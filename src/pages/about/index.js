import React from 'react'
import Image from 'next/image'
const About = () => {
    return (
        <>
            <div className="bg-white dark:bg-gray-900">
                <div className="gap-16 items-center py-8 px-5 mx-auto max-w-screen-2xl lg:grid lg:grid-cols-2 lg:py-16 lg:pl-10">
                    <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">About CellMyOrgan</h2>
                        <div className="mb-4 text-base">The Jeevasarthakathe has been constituted by the Government of Karnataka for a sustained deceased donor (Cadaver) transplantation programme in the state of Karnataka. Jeevasarthakathe is the body appointed to oversee the implementation of the Transplantation of Human Organs Act of 1994. The organization aims to coordinate the deceased donor transplantation activities and also educate the public on organ donation. The functions of Jeevasarthakathe include, involving the hospitals for active participation of the deceased donor (Cadaver) program through promotional activities, seminars, workshops and educational programmes. The public awareness programme takes place through hospitals, educational institutions, corporates and non-governmental organizations along with media participation.</div>

                        <p className='font-bold text-lg'>The mission of Jeevasarthakathe is:</p>
                        <ul className='list-disc'>
                            <li> To establish effective deceased donor (cadaver) organ procurement and just distribution of organs.</li>
                            <li> To set up organ sharing by minimizing wastage of organs.</li>
                            <li>To assure quality control by collection, analysis and publications of data on organ donation, procurement and transplantation. </li>
                            <li>To increase public awareness.</li>
                            <li>Jeevasarthakathe works through a team effort of participating hospitals for the achievement of a sustained cadaveric transplant programme.</li>
                            <li>Jeevasarthakathe will be entirely responsible for managing the Karnataka State Organ and Tissue Sharing System and any other activity entrusted to it by the Health and Family Welfare Department of the State Government.</li>
                        </ul>

                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4  ">

                        <Image className="w-full rounded-lg" src="/images/heart1.jpg" alt="Heart Image" width='1000' height='1000' />
                        <Image className="mt-10 w-full lg:mt-10 rounded-lg" src="/images/img.jpg" alt="office content 2" width={800} height={1000} />

                    </div>
                </div>

            </div>
        </>
    )
}

export default About