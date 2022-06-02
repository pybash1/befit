import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import cookieCutter from "cookie-cutter";

import Navbar from "../components/Navbar";
import FAQ from "../components/FAQ";
import Link from "next/link";

const Home = () => {
  useEffect(() => {
    if (
      cookieCutter.get("access-token") !== null ||
      cookieCutter.get("access-token") !== undefined ||
      cookieCutter.get("access-token") !== ""
    ) {
      let API_URL =
        process.env.NODE_ENV === "development"
          ? "http://localhost:8000/checkjwt"
          : "https://befit.up.railway.app/checkjwt";
      console.log(cookieCutter.get("access-token"));
      fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookieCutter.get("access-token"),
        },
      }).then((res) =>
        res.json().then((data) => {
          if (data.valid === true) {
            window.location.href = "/dashboard";
          }
        })
      );
    }
  });

  return (
    <div className="h-full dark:bg-gray-800 font-[Poppins]">
      <Head>
        <title>BeFit - Home</title>
      </Head>
      <Navbar />
      <br />
      <br />
      <div className="flex flex-col items-center">
        <div className="text-center dark:text-white text-4xl font-extrabold">
          The Fitness Tracker{" "}
          <strong className="underline decoration-[6px] decoration-[#2563EB] underline-offset-[6px]">
            that Works
          </strong>
          <a className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
            .
          </a>
        </div>
        &nbsp;
        <div>
          <div className="text-gray-500 font-semibold text-center pb-8">
            Find workouts that fit your fitness goals,
            <br />
            while we track your progress with pretty charts!
          </div>
        </div>
        <div>
          <Link href="/register">
            <a className="bg-gradient-to-tr from-blue-600 to-blue-400 dark:text-white font-semibold py-3 px-8 border-b-4 border-blue-400 rounded-lg">
              Get Started
            </a>
          </Link>
          &nbsp;&nbsp;&nbsp;
          <a
            href="#features"
            className="bg-gray-300 dark:bg-[#2F303D] dark:text-white font-semibold py-3 px-8 border-b-4 dark:border-gray-900 rounded-lg"
          >
            Learn More
          </a>
        </div>
        <div className="py-8"></div>
        <div>
          <h1 className="font-extrabold text-4xl dark:text-white" id="features">
            Features
          </h1>
        </div>
        <div className="py-8"></div>
        <div className="px-20 dark:text-white">
          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl font-normal">Workout Recommendations</h1>
              <div className="pt-4 text-gray-500 font-semibold">
                BeFit, uses its smart algorithms to find the best workouts that
                suit your plan! It has all kinds of workouts, exercises, yoga
                and more! It also supports finding music that suits your mood!
                It also has certain predefined plans to choose from!
              </div>
            </div>
            <div>
              <Image
                src="/workout.svg"
                alt="illustration"
                width={300}
                height={300}
              />
            </div>
            <div>
              <Image
                src="/progress.svg"
                alt="illustration"
                width={300}
                height={300}
              />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl font-normal">Progress Tracking</h1>
              <div className="pt-4 text-gray-500 font-semibold">
                BeFit allows you to log your daily exercises, runs, hikes,
                workouts and more! This data helps BeFit analyze your
                performance as well as help you find the best workouts for your
                fitness goals! It alows gives a demographic on your consistency.
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl font-normal">Statistical Analysis</h1>
              <div className="pt-4 text-gray-500 font-semibold">
                BeFit uses curated algorithms to analyze your performance and
                demographics and gives you a visual representation of the same!
                It also gives you a visual representation of your progress over
                time and consistency with your plans and goals!
              </div>
            </div>
            <div>
              <Image
                src="/stats.svg"
                alt="illustration"
                width={300}
                height={300}
              />
            </div>
          </div>
        </div>
        <div id="faq" className="px-20">
          <FAQ />
        </div>
        <div id="about">
          <section className="bg-white dark:bg-gray-800">
            <div className="container px-6 py-8 mx-auto">
              <div className="items-center lg:flex">
                <div className="lg:w-1/2">
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                    About BeFit
                  </h2>

                  <p className="mt-4 text-gray-500 dark:text-gray-400 lg:max-w-md">
                    BeFit is a modern Fitness Tracker that actually works. From
                    tracking your exercises and runs to providing a customized
                    workout plan to nudging you when needed! BeFit has it all.
                    With a simple, intuitive and easy to use user interface, you
                    get the best user experience!
                  </p>
                </div>

                <div className="mt-8 lg:mt-0 lg:w-1/2">
                  <div className="flex items-center justify-center lg:justify-end">
                    <div className="max-w-lg">
                      <img
                        className="object-cover object-center w-full h-64 rounded-md shadow"
                        src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <footer className="flex justify-center px-4 text-gray-800 bg-white dark:dark:text-white dark:bg-gray-800">
        <div className="container py-6">
          <h1 className="text-lg font-bold text-center lg:text-2xl">
            So, What are you Waiting for?
            <br />
            <p className="bg-gradient-to-r from-blue-800 to-blue-300 bg-clip-text text-transparent">
              Get Started Now!
            </p>
          </h1>

          <div className="flex justify-center mt-6">
            <div className="bg-white border rounded-md focus-within:ring dark:bg-gray-800 dark:border-gray-600 focus-within:border-blue-400 focus-within:ring-blue-300 focus-within:ring-opacity-40 dark:focus-within:border-blue-300">
              <div className="flex flex-wrap justify-between md:flex-row">
                <Link href="/register">
                  <a className="bg-gradient-to-tr from-blue-600 to-blue-400 dark:text-white font-semibold py-3 px-8 rounded-lg">
                    Get Started
                  </a>
                </Link>
              </div>
            </div>
          </div>

          <hr className="h-px mt-6 border-gray-300 border-none dark:bg-gray-700" />

          <div className="flex flex-col items-center justify-between mt-6 md:flex-row">
            <div>
              <a
                href="#"
                className="text-xl font-bold text-gray-800 dark:dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
              >
                BeFit
              </a>
            </div>

            <div className="flex mt-4 md:m-0">
              <div className="-mx-4">
                <a
                  href="#features"
                  className="px-4 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 hover:underline"
                >
                  Features
                </a>
                <a
                  href="#faq"
                  className="px-4 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 hover:underline"
                >
                  FAQ
                </a>
                <a
                  href="#about"
                  className="px-4 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 hover:underline"
                >
                  About
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
