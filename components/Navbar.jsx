import Link from "next/link";
import cookieCutter from 'cookie-cutter';
import { useRouter } from "next/router";
import { useState } from "react";

function Navbar(props) {
    const router = useRouter();
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push(`/search/${query}`);
    }

    const logout = (e) => {
        cookieCutter.set("access-token", undefined);
        router.push("/login")
    }

    return props.loggedin ? (
        <nav className="bg-white shadow dark:bg-gray-800">
            <div className="container px-6 py-3 mx-auto">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Link href="/dashboard"><a className="text-2xl font-bold text-gray-800 transition-colors duration-200 transform dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300">BeFit</a></Link>
                            <div className="hidden mx-10 md:block">
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                    </span>

                                    <form onSubmit={handleSubmit}>
                                        <input value={query} onChange={(e) => {setQuery(e.target.value)}} type="text" className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300" placeholder="Search" />
                                        <button type="submit"></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="flex md:hidden">
                            <button type="button" className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                                    <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="items-center md:flex">
                        <div className="flex flex-col mt-2 md:flex-row md:mt-0 md:mx-1">
                            <Link href="/dashboard">
                                <a className="my-1 text-sm leading-5 text-gray-700 transition-colors duration-200 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:mx-4 md:my-0">Dashboard</a>
                            </Link>
                            <Link href="/workouts">
                                <a className="my-1 text-sm leading-5 text-gray-700 transition-colors duration-200 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:mx-4 md:my-0">Workouts</a>
                            </Link>
                            <Link href="/progress">
                                <a className="my-1 text-sm leading-5 text-gray-700 transition-colors duration-200 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:mx-4 md:my-0">Progress</a>
                            </Link>
                            <Link href="/stats">
                                <a className="my-1 text-sm leading-5 text-gray-700 transition-colors duration-200 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:mx-4 md:my-0">Stats</a>
                            </Link>
                            <Link href="/meditation">
                                <a className="my-1 text-sm leading-5 text-gray-700 transition-colors duration-200 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:mx-4 md:my-0">Meditation</a>
                            </Link>
                        </div>

                        <div className="flex items-center py-2 -mx-1 md:mx-0">
                            <button onClick={logout} className="block w-1/2 px-3 py-2 mx-1 text-sm font-medium leading-5 text-center text-white transition-colors duration-200 transform bg-[#2F303D] rounded-md hover:bg-blue-600 md:mx-2 md:w-auto">Logout</button>
                        </div>

                        <div className="mt-3 md:hidden">
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </span>

                                <form onSubmit={handleSubmit}>
                                    <input value={query} onChange={(e) => {setQuery(e.target.value)}} type="text" className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300" placeholder="Search" />
                                    <button type="submit"></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    ) : (
        <nav className="bg-white shadow dark:bg-gray-800">
            <div className="container px-6 py-3 mx-auto">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Link href="/"><a className="text-2xl font-bold text-gray-800 transition-colors duration-200 transform dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300">BeFit</a></Link>
                        </div>
                        <div className="flex md:hidden">
                            <button type="button" className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                                    <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="items-center md:flex">
                        <div className="flex flex-col mt-2 md:flex-row md:mt-0 md:mx-1">
                            <Link href="/"><a className="my-1 text-sm leading-5 text-gray-700 transition-colors duration-200 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:mx-4 md:my-0">Home</a></Link>
                            <Link href="/#features"><a className="my-1 text-sm leading-5 text-gray-700 transition-colors duration-200 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:mx-4 md:my-0">Features</a></Link>
                            <Link href="/#faq"><a className="my-1 text-sm leading-5 text-gray-700 transition-colors duration-200 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:mx-4 md:my-0">FAQ</a></Link>
                            <Link href="/#about"><a className="my-1 text-sm leading-5 text-gray-700 transition-colors duration-200 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:mx-4 md:my-0">About</a></Link>
                        </div>

                        <div className="flex items-center py-2 -mx-1 md:mx-0">
                            <Link href="/login"><a className="block w-1/2 px-3 py-2 mx-1 text-sm font-medium leading-5 text-center text-white transition-colors duration-200 transform bg-[#2F303D] rounded-md hover:bg-blue-600 md:mx-2 md:w-auto">Login</a></Link>
                            <Link href="/register"><a className="block w-1/2 px-3 py-2 mx-1 text-sm font-medium leading-5 text-center text-white transition-colors duration-200 transform bg-gradient-to-tr from-blue-600 to-blue-400 rounded-md md:mx-0 md:w-auto">Get Started</a></Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;