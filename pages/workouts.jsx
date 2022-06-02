import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import cookieCutter from "cookie-cutter";

import Navbar from "../components/Navbar";

import workouts from "../data/workouts.json";

const Workouts = () => {
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

  return (
    <div className="h-full dark:bg-gray-800">
      <Head>
        <title>BeFit - Workouts</title>
      </Head>
      <Navbar loggedin />
      <div className="p-10">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
              {workouts.exercises.map((workout, index) => {
                return (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      {workout.name}
                    </th>
                    <td className="px-6 py-4 capitalize">{workout.category}</td>
                    <td className="px-6 py-4 capitalize">{workout.level}</td>
                    <td className="px-6 py-4 capitalize">
                      {workout.equipment || "None"}
                    </td>
                    <td className="px-6 py-4 capitalize">
                      {workout.primaryMuscles}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/workout/${workouts.exercises.indexOf(workout)}`}
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
    </div>
  );
};

export default Workouts;
