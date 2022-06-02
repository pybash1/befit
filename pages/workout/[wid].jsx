import Head from "next/head";
import { useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import cookieCutter from "cookie-cutter";

import Navbar from "../../components/Navbar";

import workouts from "../../data/workouts.json";

export async function getStaticPaths() {
  const length = workouts.exercises.length;
  const paths = [];
  for (let wid = 0; wid < length; wid++) {
    paths.push({ params: { wid: `${wid}` } });
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const wid = parseInt(params?.wid);
  const workout = workouts.exercises[wid];
  return {
    props: {
      wid,
      workout,
    },
  };
}

const Workout = ({
  workout,
  wid,
}) => {
  useEffect(() => {
    if (
      cookieCutter.get("access-token") === undefined ||
      cookieCutter.get("access-token") === null ||
      cookieCutter.get("access-token") === ""
    ) {
      window.location.href = "/login";
    } else {
      let API_URL =
        process.env.NODE_ENV === "development"
          ? "http://localhost:8000/checkjwt"
          : "https://befit.up.railway.app";
      fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookieCutter.get("access-token")}`,
        },
      }).then((res) =>
        res.json().then((data) => {
          if (data.valid !== true) {
            window.location.href = "/login";
          }
        })
      );
    }
  }, []);

  if (typeof wid !== "number" || wid < 0 || wid >= workouts.exercises.length) {
    return <div className="h-full dark:bg-gray-800">404</div>;
  }

  const twitterLink = `https://twitter.com/intent/tweet?text=Check out this workout on BeFit!%0AWorkout Name: ${workout.name}%0A%0A&url=http://localhost:3000/workout/${wid}`;
  const copyLink = `Check out this workout on BeFit!\nWorkout Name: ${workout.name}\n\nLink: http://localhost:3000/workout/${wid}`;
  const equipLink = `https://amazon.com/s?k=${workout?.equipment}`;

  return (
    <div className="min-h-screen h-full dark:bg-gray-800">
      <Head>
        <title>BeFit - Workout - {workout?.name}</title>
      </Head>
      <Navbar loggedin />
      <div className="lg:full w-full lg:pl-10 lg:pr-10 lg:py-6 mt-6 lg:mt-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">
          {workout.equipment ? "Equipments Needed" : "No Equipments Needed"}
        </h2>
        <h1 className="dark:text-white text-3xl title-font font-medium mb-1">
          {workout.name}
        </h1>
        <div className="flex mb-4">
          <span className="flex items-center">
            <span className="dark:text-white">Share on </span>
          </span>
          <span className="flex pl-1 py-2  text-gray-500 space-x-2">
            <a href={twitterLink} target="_blank">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <CopyToClipboard text={copyLink}>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
              </button>
            </CopyToClipboard>
          </span>
        </div>
        <div className="leading-relaxed dark:text-white">
          <ol className="relative border-l border-gray-200 dark:border-gray-700">
            {workout.instructions.map((instruction, i) => {
              return (
                <li className="mb-10 ml-4" key={i}>
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    {instruction}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-800 mb-5">
          <div className="flex">
            <span className="mr-3 dark:text-white">Primary Muscles: </span>
            <a className="focus:outline-none dark:text-white capitalize">
              {workout.primaryMuscles}
            </a>
          </div>
          <div className="flex ml-6 items-center">
            <span className="mr-3 dark:text-white">Secondary Muscles: </span>
            <div className="relative">
              {workout.secondaryMuscles.length !== 0 ? (
                workout.secondaryMuscles.map(
                  (muscle, index) => {
                    if (index !== workout.secondaryMuscles.length - 1) {
                      return (
                        <a
                          className="focus:outline-none dark:text-white capitalize"
                          key={index}
                        >
                          {muscle}
                          {", "}
                        </a>
                      );
                    } else {
                      return (
                        <a
                          className="focus:outline-none dark:text-white capitalize"
                          key={index}
                        >
                          {muscle}
                        </a>
                      );
                    }
                  }
                )
              ) : (
                <span className="mr-3 dark:text-white">None</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex">
          <span className="title-font font-medium text-2xl text-white capitalize">
            Improves {workout.category}
          </span>
          {workout?.equipment !== null ? (
            <a
              href={equipLink}
              target="_blank"
              className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
            >
              Search for Equipments
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Workout;
