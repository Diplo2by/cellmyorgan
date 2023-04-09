import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
const index = () => {
    return (
        <>
            <Head>
                <title>FAQs Page</title>
            </Head>
            <div>
                <section className="text-gray-700">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="text-center mb-20">
                            <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
                                Frequently Asked Question
                            </h1>
                            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
                                The most common questions about CellMyOrgan
                            </p>
                        </div>
                        <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
                            <div className="w-full lg:w-1/2 px-4 py-2">
                                <details className="mb-4">
                                    <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                                        Who can be a donor?
                                    </summary>

                                    <span>
                                        Anyone from a child to an old person. Even if you have had a serious illness in the past, you can still become a donor under the right circumstances.
                                    </span>
                                </details>
                                <details className="mb-4">
                                    <summary className="font-semibold bg-gray-200 rounded-md py-2 px-4">
                                        Can people buy or sell organs?                                     </summary>

                                    <span>
                                        No. The &quot;Transplantation of Human Organs Act&quot; prohibits any commercial dealings in organs and makes this a punishable offence.
                                    </span>
                                </details>
                                <details className="mb-4">
                                    <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                                        Who will receive the organs?
                                    </summary>
                                    <span>
                                        Recipients are chosen on the grounds of need, longest waiting time and by blood group and if necessary, by tissue characteristics. There is a waiting list for organ transplants because demand exceeds supply.
                                    </span>
                                </details>
                            </div>
                            <div className="w-full lg:w-1/2 px-4 py-2">
                                <details className="mb-4">
                                    <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                                        Are there any religious objections to organ donations?
                                    </summary>
                                    <span>
                                        Most of the religious groups support the concept of organ donation. However if you have any doubt you can discuss it with your spiritual or religious leader.
                                    </span>
                                </details>
                                <details className="mb-4">
                                    <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                                        How does the brain death occur?
                                    </summary>
                                    <span>
                                        Brain death usually results from a severe brain injury or brain haemorrhage which causes all the brain activity to stop. This can happen after a major road accident or a bleeding in the brain due to stroke.
                                    </span>
                                </details>
                                <details className="mb-4">
                                    <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                                        What is brain death?
                                    </summary>
                                    <span>
                                        Normally the death is said to occur when heart stops. But with modern technology the heart and lungs can be made to function through mechanical support even when brain function has completely and permanently ceased. Thus once brain death occurs; the person becomes a cadaver with a beating heart.
                                    </span>
                                </details>
                            </div>
                        </div>
                        <div className='text-center text-xl'> <p>For more queries feel free to  <Link href="/contact" className='text-gray-800 underline'>Contact us</Link></p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default index