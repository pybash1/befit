function FAQ() {
    return (
        <section className="bg-white dark:bg-[#1F2937]">
            <div className="container px-6 py-12 mx-auto">
                <h1 className="text-2xl font-extrabold text-gray-800 lg:text-4xl dark:text-white text-center">Frequently Asked Questions</h1>
                
                <div className="grid grid-cols-1 gap-8 mt-8 lg:mt-16 md:grid-cols-2 xl:grid-cols-3">
                    <div>
                        <div className="inline-block p-3 text-white bg-blue-600 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>

                        <div>
                            <h1 className="text-xl font-semibold text-gray-700 dark:text-white">Where is your progress stored?</h1>

                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                                Your progress is safely stored in the cloud and only you can access it.
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className="inline-block p-3 text-white bg-blue-600 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>

                        <div>
                            <h1 className="text-xl font-semibold text-gray-700 dark:text-white">Where does the workouts and other data come from?</h1>

                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                                All of the workouts, and other data comes from either our own API or a 3rd party API or library.
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className="inline-block p-3 text-white bg-blue-600 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>

                        <div>
                            <h1 className="text-xl font-semibold text-gray-700 dark:text-white">Why another Fitness Tracker?</h1>

                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                                This project was developed as part of the <a className="transition-colors duration-200 transform hover:text-blue-600 dark:hover:text-blue-400" href="https://www.codingal.com/competitions/bits-pilani-junior-codefest/">BITS Pilani Apogee Junior Codefest 2022</a>, and there can never be too many Fitness Trackers!
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className="inline-block p-3 text-white bg-blue-600 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>

                        <div>
                            <h1 className="text-xl font-semibold text-gray-700 dark:text-white">Is the free?</h1>

                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                                Yes, this is a 100% free! Try it out! It is also open source and the source code can be found on GitHub.
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className="inline-block p-3 text-white bg-blue-600 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>

                        <div>
                            <h1 className="text-xl font-semibold text-gray-700 dark:text-white">How is this different from other Fitness Trackers?</h1>

                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                                BeFit has more tools than an average Fitness Tracker. It also has a really nice user interface to get started easily. But of course, this is what we think, try it out and see what you think makes it different!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FAQ