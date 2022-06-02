import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import cookieCutter from "cookie-cutter";
import toast, { Toaster } from "react-hot-toast";
import { Bar } from "react-chartjs-2";

import Navbar from "../components/Navbar";
import getItems from "../lib/sortData";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: "rgb(255, 255, 255)",
      }
    },
    title: {
      display: true,
      text: "This Week's Progress Overview",
      color: "rgb(255, 255, 255)",
    },
  },
  scales: {
    x: {
      grid: {
        color: "rgb(255, 255, 255)",
      },
      ticks: {
        color: "rgb(255, 255, 255)",
      },
    },
    y: {
      grid: {
        color: "rgb(255, 255, 255)",
      },
      ticks: {
        color: "rgb(255, 255, 255)",
      },
    },
  },
  elements: {
    line: {
      borderColor: "rgb(255, 255, 255)",
  },
}};

export const loptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: "rgb(0, 0, 0)",
      }
    },
    title: {
      display: true,
      text: "This Week's Progress Overview",
      color: "rgb(0, 0, 0)",
    },
  },
  scales: {
    x: {
      grid: {
        color: "rgb(0, 0, 0)",
      },
      ticks: {
        color: "rgb(0, 0, 0)",
      },
    },
    y: {
      grid: {
        color: "rgb(0, 0, 0)",
      },
      ticks: {
        color: "rgb(0, 0, 0)",
      },
    },
  },
  elements: {
    line: {
      borderColor: "rgb(0, 0, 0)",
  },
}};

const Progress = () => {
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

  let API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/logs"
      : "https://befit.up.railway.app";

  let API_URL2 =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/create/log"
      : "https://befit.up.railway.app";

  const [workoutName, setWorkoutName] = useState("");
  const [workoutType, setWorkoutType] = useState("Workout");

  const addExercise = () => {
    if (workoutName === "") {
      toast.error("Workout name cannot be empty!")
    } else {
      let newDate = new Date();
      if (workoutType === "Hike" || workoutType === "Run" || workoutType === "Walk") {
        fetch(API_URL2, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookieCutter.get("access-token")}`,
          },
          body: JSON.stringify({name: workoutName, type: "Hike/Run/Walk", date: newDate.toLocaleDateString().split("/")[1] + "/" + newDate.toLocaleDateString().split("/")[0] + "/" + newDate.toLocaleDateString().split("/")[2]}),
        })
        toast.success("Added workout successfully!")
      } else {
        fetch(API_URL2, {
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
  }

  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieCutter.get("access-token")}`,
      },
    }).then((res) =>
      res.json().then((data) => {
        setLoading(false);
        setWorkouts(data);
      })
    );
  }, []);

  const td = new Date();
  const yd = new Date();
  yd.setDate(td.getDate() - 1);
  const dayb2 = new Date();
  dayb2.setDate(td.getDate() - 2);
  const dayb3 = new Date();
  dayb3.setDate(td.getDate() - 3);
  const dayb4 = new Date();
  dayb4.setDate(td.getDate() - 4);
  const dayb5 = new Date();
  dayb5.setDate(td.getDate() - 5);
  const dayb6 = new Date();
  dayb6.setDate(td.getDate() - 6);

  if (loading) {
    return (
      <div className="dark:bg-gray-800 dark:text-white h-screen">
        <Head>
          <title>BeFit - Track your Progress</title>
        </Head>
        <Toaster
          toastOptions={{ style: { background: "#111827", color: "#fff" } }}
        />
        <Navbar loggedin />
        <div className="grid grid-cols-2 gap-10 p-10">
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
                  className="h-5 w-5 text-white"
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
                required
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
              Visualize your Progress
            </h1>
            <br />
            <div className="flex items-end">
              <div className="animate-pulse w-2 bg-gray-500 dark:bg-gray-400 h-56 rounded-md"></div>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <div className="animate-pulse w-10 bg-gray-500 dark:bg-gray-400 h-36 rounded-md"></div>
              &nbsp;&nbsp;&nbsp;
              <div className="animate-pulse w-10 bg-gray-500 dark:bg-gray-400 h-48 rounded-md"></div>
              &nbsp;&nbsp;&nbsp;
              <div className="animate-pulse w-10 bg-gray-500 dark:bg-gray-400 h-24 rounded-md"></div>
              &nbsp;&nbsp;&nbsp;
              <div className="animate-pulse w-10 bg-gray-500 dark:bg-gray-400 h-56 rounded-md"></div>
              &nbsp;&nbsp;&nbsp;
              <div className="animate-pulse w-10 bg-gray-500 dark:bg-gray-400 h-32 rounded-md"></div>
              &nbsp;&nbsp;&nbsp;
              <div className="animate-pulse w-10 bg-gray-500 dark:bg-gray-400 h-56 rounded-md"></div>
              &nbsp;&nbsp;&nbsp;
              <div className="animate-pulse w-10 bg-gray-500 dark:bg-gray-400 h-24 rounded-md"></div>
              &nbsp;&nbsp;&nbsp;
              <div className="animate-pulse w-10 bg-gray-500 dark:bg-gray-400 h-36 rounded-md"></div>
              &nbsp;&nbsp;&nbsp;
              <div className="animate-pulse w-10 bg-gray-500 dark:bg-gray-400 h-48 rounded-md"></div>
              &nbsp;&nbsp;&nbsp;
              <div className="animate-pulse w-10 bg-gray-500 dark:bg-gray-400 h-20 rounded-md"></div>
              &nbsp;&nbsp;&nbsp;
              <div className="animate-pulse w-10 bg-gray-500 dark:bg-gray-400 h-56 rounded-md"></div>
            </div>
            <br />
            <div className="animate-pulse w-auto bg-gray-500 dark:bg-gray-400 h-2 rounded-md"></div>
          </div>
        </div>
        <div className="p-10">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Workout Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    <div className="animate-pulse w-36 bg-gray-300 dark:bg-gray-500 h-6 rounded-md"></div>
                  </th>
                  <td className="px-6 py-4"><div className="animate-pulse w-36 bg-gray-300 dark:bg-gray-500 h-6 rounded-md"></div></td>
                  <td className="px-6 py-4"><div className="animate-pulse w-36 bg-gray-300 dark:bg-gray-500 h-6 rounded-md"></div></td>
                  <td className="px-6 py-4">
                    <div className="animate-pulse w-36 bg-gray-300 dark:bg-gray-500 h-6 rounded-md"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="animate-pulse w-36 bg-gray-300 dark:bg-gray-500 h-6 rounded-md"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  let today_w = getItems(workouts, "workout", td);
  let yesterday_w = getItems(workouts, "workout", yd);
  let day2_w = getItems(workouts, "workout", dayb2);
  let day3_w = getItems(workouts, "workout", dayb3);
  let day4_w = getItems(workouts, "workout", dayb4);
  let day5_w = getItems(workouts, "workout", dayb5);
  let day6_w = getItems(workouts, "workout", dayb6);
  let today_e = getItems(workouts, "exercise", td);
  let yesterday_e = getItems(workouts, "exercise", yd);
  let day2_e = getItems(workouts, "exercise", dayb2);
  let day3_e = getItems(workouts, "exercise", dayb3);
  let day4_e = getItems(workouts, "exercise", dayb4);
  let day5_e = getItems(workouts, "exercise", dayb5);
  let day6_e = getItems(workouts, "exercise", dayb6);
  let today_o = getItems(workouts, "hike/run/walk", td);
  let yesterday_o = getItems(workouts, "hike/run/walk", yd);
  let day2_o = getItems(workouts, "hike/run/walk", dayb2);
  let day3_o = getItems(workouts, "hike/run/walk", dayb3);
  let day4_o = getItems(workouts, "hike/run/walk", dayb4);
  let day5_o = getItems(workouts, "hike/run/walk", dayb5);
  let day6_o = getItems(workouts, "hike/run/walk", dayb6);
  // console.log(today_w.length*10)
  // console.log(today_e.length*10)
  // console.log(yesterday_w.length*10)
  // console.log(yesterday_e.length*10)
  // console.log(day2_w.length*10)
  // console.log(day2_e.length*10)
  // console.log(day3_w.length*10)
  // console.log(day3_e.length*10)
  // console.log(day4_w.length*10)
  // console.log(day4_e.length*10)
  // console.log(day5_w.length*10)
  // console.log(day5_e.length*10)
  // console.log(day6_w.length*10)
  // console.log(day6_e.length*10)

  return (
    <div className="h-full dark:bg-gray-800">
      <Head>
        <title>BeFit - Track your Progress</title>
      </Head>
      <Toaster
          toastOptions={{ style: { background: "#111827", color: "#fff" } }}
        />
      <Navbar loggedin />
      <div className="grid grid-cols-2 gap-10 p-10">
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
              required
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
            Visualize your Progress
          </h1>
          <br />
          <div className="chart-light">
            <Bar options={loptions} data={{
              labels: [dayb6.toLocaleDateString(), dayb5.toLocaleDateString(), dayb4.toLocaleDateString(), dayb3.toLocaleDateString(), dayb2.toLocaleDateString(), "Yesterday", "Today"],
              datasets: [
                {
                  label: "Workouts",
                  data: [day6_w.length, day5_w.length, day4_w.length, day3_w.length, day2_w.length, yesterday_w.length, today_w.length],
                  backgroundColor: "rgba(255, 99, 132, 1)",
                },
                {
                  label: "Exercises",
                  data: [day6_e.length, day5_e.length, day4_e.length, day3_e.length, day2_e.length, yesterday_e.length, today_e.length],
                  backgroundColor: "rgba(54, 162, 235, 1)",
                },
                {
                  label: "Hikes/Runs/Walks",
                  data: [day6_o.length, day5_o.length, day4_o.length, day3_o.length, day2_o.length, yesterday_o.length, today_o.length],
                  backgroundColor: "rgba(255, 206, 86, 1)",
                }
              ]
            }}/>
          </div>
          <div className="chart-dark">
            <Bar options={options} data={{
              labels: [dayb6.toLocaleDateString(), dayb5.toLocaleDateString(), dayb4.toLocaleDateString(), dayb3.toLocaleDateString(), dayb2.toLocaleDateString(), "Yesterday", "Today"],
              datasets: [
                {
                  label: "Workouts",
                  data: [day6_w.length, day5_w.length, day4_w.length, day3_w.length, day2_w.length, yesterday_w.length, today_w.length],
                  backgroundColor: "rgba(255, 99, 132, 1)",
                },
                {
                  label: "Exercises",
                  data: [day6_e.length, day5_e.length, day4_e.length, day3_e.length, day2_e.length, yesterday_e.length, today_e.length],
                  backgroundColor: "rgba(54, 162, 235, 1)",
                },
                {
                  label: "Hikes/Runs/Walks",
                  data: [day6_o.length, day5_o.length, day4_o.length, day3_o.length, day2_o.length, yesterday_o.length, today_o.length],
                  backgroundColor: "rgba(255, 206, 86, 1)",
                }
              ]
            }}/>
          </div>
        </div>
      </div>
      <div className="p-10">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Workout Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      <Link href={`/log/${workout.key}`}>
                        <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                          {workout.log.name}
                        </a>
                      </Link>
                    </th>
                    <td className="px-6 py-4">{workout.log.type}</td>
                    <td className="px-6 py-4">{workout.log.date}</td>
                    <td className="px-6 py-4">
                      <Link href={`/log/${workout.key}`}>
                        <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                          Edit
                        </a>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/log/${workout.key}`}>
                        <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                          Delete
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

export default Progress;
