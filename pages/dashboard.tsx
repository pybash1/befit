import { NextPage } from "next";
import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import cookieCutter from "cookie-cutter";
import toast, { Toaster } from "react-hot-toast";

import Navbar from "../components/Navbar";

import workouts from "../data/workouts.json";

const Dashboard: NextPage = () => {
  const [workout, setWorkout] = useState({});
  const [desc, setDesc] = useState("");
  const [wid, setWid] = useState(-1);
  const [quote, setQuote] = useState({});

  const [weight, setWeight] = useState(75);
  const [height, setHeight] = useState(180);
  const [unit, setUnit] = useState("Metric");
  const [bmi, setBmi] = useState(0);

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
      fetch(API_URL as string, {
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

  useEffect(() => {
    let today = new Date();
    let tmr = new Date(today);
    tmr.setDate(tmr.getDate() + 1);

    if (
      cookieCutter.get("workout") === undefined ||
      cookieCutter.get("workout") === null ||
      cookieCutter.get("workout") === ""
    ) {
      let workout_temp =
        workouts.exercises[
          Math.floor(Math.random() * workouts.exercises.length)
        ];
      setWorkout(workout_temp);
      setWid(workouts.exercises.indexOf(workout_temp));
      let desc_joined = workout_temp.instructions.join(" ");
      setDesc(desc_joined.substr(0, 200) + "...");
      cookieCutter.set("workout", JSON.stringify(workout_temp), {
        expires: tmr,
      });
      cookieCutter.set("desc", desc_joined.substr(0, 200) + "...", {
        expires: tmr,
      });
      cookieCutter.set("wid", workouts.exercises.indexOf(workout_temp));
    } else {
      setWorkout(JSON.parse(cookieCutter.get("workout")));
      setWid(cookieCutter.get("wid"));
      setDesc(cookieCutter.get("desc"));
    }

    if (
      cookieCutter.get("quote") === undefined ||
      cookieCutter.get("quote") === null ||
      cookieCutter.get("quote") === ""
    ) {
      fetch("https://api.quotable.io/random").then((res) =>
        res.json().then((data) => {
          setQuote(data);
          cookieCutter.set("quote", JSON.stringify(data), { expires: tmr });
        })
      );
    } else {
      setQuote(JSON.parse(cookieCutter.get("quote")));
    }
  }, []);

  useEffect(() => {
    if (unit === "Metric") {
      setBmi(
        Math.round((weight / (((height / 100) * height) / 100)) * 100) / 100
      );
    } else {
      setBmi(Math.round(((703 * weight) / (height * height)) * 100) / 100);
    }
  }, [weight, height, unit]);

  const [workoutName, setWorkoutName] = useState("");
  const [workoutType, setWorkoutType] = useState("Workout");

  let API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/create/log"
      : "https://befit.up.railway.app";

  const addExercise = () => {
    if (workoutName === "") {
      toast.error("Workout name cannot be empty!")
    } else {
      let newDate = new Date();
      fetch(API_URL as string, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookieCutter.get("access-token")}`,
        },
        body: JSON.stringify({name: workoutName, type: workoutType, date: newDate.toLocaleDateString().split("/")[1] + "/" + newDate.toLocaleDateString().split("/")[0] + "/" + newDate.toLocaleDateString().split("/")[2]}),
      })
      toast.success("Added workout successfully!")
    }
  }

  return (
    <div className="h-full dark:bg-gray-800">
      <Head>
        <title>BeFit - Dashboard</title>
      </Head>
      <Toaster
        toastOptions={{ style: { background: "#111827", color: "#fff" } }}
      />
      <Navbar loggedin />
      <div className="pl-24 pt-20">
        <h1 className="text-5xl dark:text-white font-semibold">
          Welcome
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-10 px-20 py-8">
        <div className="bg-gray-300 dark:bg-gray-600 rounded-lg w-full p-10">
          <h1 className="text-2xl dark:text-white font-semibold">
            Today's Recommended Workout
          </h1>
          <br />
          <div className="dark:text-white">
            <div className="mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <div className="px-4 py-2">
                <div className="flex flex-row items-center">
                  <Link href={"/workout/" + wid}>
                    <a className="text-3xl font-bold text-gray-800  dark:text-white">
                      {workout.name}
                    </a>
                  </Link>
                  &nbsp;&nbsp;
                  <span className="px-3 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full dark:bg-blue-300 dark:text-blue-900">
                    {workout.primaryMuscles}
                  </span>
                  &nbsp;&nbsp;
                  {workout.secondaryMuscles
                    ?.slice(0, 3)
                    .map((muscle: string | null | undefined) => {
                      return (
                        <>
                          <span className="px-3 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full dark:bg-blue-300 dark:text-blue-900">
                            {muscle}
                          </span>
                          &nbsp;&nbsp;
                        </>
                      );
                    })}
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {desc}
                </p>
                <div className="mt-4">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <p className="font-semibold text-gray-700 dark:text-gray-200">
                        Equipment Needed
                      </p>
                    </div>
                    <span className="mx-1 text-xs text-gray-600 dark:text-gray-300 capitalize">
                      {workout.equipment || "Not Needed"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
                <h1 className="text-lg font-bold dark:text-white">
                  {workout.level}
                </h1>
                <p className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-200 transform bg-white rounded">
                  {workout.category}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-300 dark:bg-gray-600 rounded-lg w-full p-10">
          <div>
            <h1 className="text-2xl dark:text-white font-semibold">
              Today's Quote
            </h1>
          </div>
          <br />
          <div className="dark:text-white">
            <blockquote className="relative p-4 text-xl italic border-l-4 bg-neutral-100 text-neutral-600 border-neutral-500 quote">
              <div className="stylistic-quote-mark">&ldquo;</div>
              <p className="mb-4">{quote.content}</p>
              <cite className="text-sm flex items-center italic font-bold">
                -
                <div className="flex flex-col items-center">
                  <span className="mb-1 text-sm italic font-bold">
                    {quote.author}
                  </span>
                </div>
              </cite>
            </blockquote>
          </div>
        </div>
        <div className="bg-gray-300 dark:bg-gray-600 rounded-lg w-full p-10">
          <h1 className="text-2xl dark:text-white font-semibold">
            Add Exercise
          </h1>
          <br />
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Workout Name
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 dark:text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <input
              value={workoutName}
              onChange={(e) => {setWorkoutName(e.target.value)}}
              type="text"
              className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              placeholder="Exercise or Workout Name"
            />
          </div>
          <br />
          <label
            htmlFor="type"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Workout Type
          </label>
          <select
            value={workoutType}
            onChange={(e) => {setWorkoutType(e.target.value)}}
            id="type"
            className="w-full py-3 px-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          >
            <option>Workout</option>
            <option>Exercise</option>
            <option>Hike</option>
            <option>Run</option>
            <option>Walk</option>
          </select>
          <br />
          <br />
          <button onClick={addExercise} className="bg-gradient-to-tr from-blue-600 to-blue-400 dark:text-white font-semibold py-3 px-8 rounded-lg">
            Add Exercise
          </button>
        </div>
        <div className="bg-gray-300 dark:bg-gray-600 rounded-lg w-full p-10">
          <h1 className="text-2xl dark:text-white font-semibold">
            BMI Calculator
          </h1>
          <br />
          <div>
            <label
              htmlFor="weight"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Weight
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 dark:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
              </span>
              <input
                type="text"
                value={weight}
                onChange={(e) => {
                  setWeight(e.target.value);
                }}
                className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                placeholder="Weight"
              />
            </div>
            <br />
            <label
              htmlFor="height"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Height
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 dark:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                  />
                </svg>
              </span>
              <input
                type="text"
                value={height}
                onChange={(e) => {
                  setHeight(e.target.value);
                }}
                className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                placeholder="Height"
              />
            </div>
            <br />
            <label
              htmlFor="unit"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Unit System
            </label>
            <select
              id="unit"
              value={unit}
              onChange={(e) => {
                setUnit(e.target.value);
              }}
              className="w-full py-3 px-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            >
              <option>Metric</option>
              <option>Imperial</option>
            </select>
            <br />
            <div className="mt-4">
              <div className="flex items-center">
                <div className="flex items-center">
                  <p className="font-semibold text-gray-700 dark:text-gray-200">
                    BMI
                  </p>
                </div>
                <span className="mx-1 text-xs text-gray-600 dark:text-gray-300 capitalize">
                  {bmi}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                <div className="flex items-center">
                  <p className="font-semibold text-gray-700 dark:text-gray-200">
                    You are{" "}
                  </p>
                </div>
                <span className="mx-1 text-xs text-gray-600 dark:text-gray-300 capitalize">
                  {bmi < 15
                    ? "Very severely underweight"
                    : bmi < 16
                    ? "Severely underweight"
                    : bmi < 18.5
                    ? "Underweight"
                    : bmi < 25
                    ? "Healthy"
                    : bmi < 30
                    ? "Overweight"
                    : bmi < 35
                    ? "Moderately obese"
                    : bmi < 40
                    ? "Severely obese"
                    : "Very severely obese"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
