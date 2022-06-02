import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import cookieCutter from "cookie-cutter";

import Navbar from "../../components/Navbar";

import workouts from "../../data/workouts.json";

export async function getStaticPaths() {
  const length = workouts.exercises.length;
  const paths = [];
  for (let query = 0; query < length; query++) {
    paths.push({ params: { query: `${query}` } });
  }

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({
  params,
}) {
  const query = params?.query;
  return {
    props: {
      query,
    },
  };
}

const Search = ({ query }) => {
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

  const exercises = workouts.exercises.filter((workout) =>
    workout.name.toLowerCase().includes(query)
  );

  return (
    <div className="h-full dark:bg-gray-800">
      <Head>
        <title>BeFit - Search for {query}</title>
      </Head>
      <Navbar loggedin />
      {exercises.length !== 0 ? (
        <div className="p-10 min-h-screen h-full">
          <div className="dark:bg-gray-800 relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Workout/Exercise
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Level
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Equipment
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Muscles Developed
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only"></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {exercises.map((workout) => {
                  return (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                      >
                        {workout.name}
                      </th>
                      <td className="px-6 py-4 capitalize">
                        {workout.category}
                      </td>
                      <td className="px-6 py-4 capitalize">{workout.level}</td>
                      <td className="px-6 py-4 capitalize">
                        {workout.equipment || "None"}
                      </td>
                      <td className="px-6 py-4 capitalize">
                        {workout.primaryMuscles}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/workout/${workouts.exercises.indexOf(
                            workout
                          )}`}
                        >
                          <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                            View
                          </a>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="h-screen dark:bg-gray-800 flex items-center justify-center text-white text-3xl">
          No Matches Found!
        </div>
      )}
    </div>
  );
};

export default Search;
