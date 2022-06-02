import Head from "next/head";
import { useEffect, useState } from "react";
import { Pie, Line } from "react-chartjs-2";
import cookieCutter from "cookie-cutter";
import { getAll } from "../lib/sortData";

import Navbar from "../components/Navbar";

import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

export const options = {
  plugins: {
    legend: {
      labels: {
        color: "rgb(255, 255, 255)",
      },
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
  },
};

export const loptions = {
  plugins: {
    legend: {
      labels: {
        color: "rgb(0, 0, 0)",
      },
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
  },
};

const Stats = () => {
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
          : "https://befit.up.railway.app/checkjwt";
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

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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
  const dates = [
    dayb2.toLocaleDateString(),
    dayb3.toLocaleDateString(),
    dayb4.toLocaleDateString(),
    dayb5.toLocaleDateString(),
    dayb6.toLocaleDateString(),
    "Yesterday",
    "Today",
  ];

  let API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/logs"
      : "https://befit.up.railway.app/logs";

  useEffect(() => {
    fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieCutter.get("access-token")}`,
      },
    }).then(res => res.json().then(data => {
      setLoading(false);
      setData(data);
    }))
  }, [])

  let today = getAll(data, td);
  let yesterday = getAll(data, yd);
  let day2 = getAll(data, dayb2);
  let day3 = getAll(data, dayb3);
  let day4 = getAll(data, dayb4);
  let day5 = getAll(data, dayb5);
  let day6 = getAll(data, dayb6);

  let fitnessScore = (today.length + yesterday.length + day2.length + day3.length + day4.length + day5.length + day6.length) / 7;
  fitnessScore = fitnessScore.toFixed(2);

  if (loading) {
    return (
      <div className="h-screen dark:bg-gray-800">
      <Navbar loggedin />
      <Head>
        <title>BeFit - Statistics</title>
      </Head>
      <div className="flex flex-col items-center dark:text-white">
        <div className="pt-10">
          <div className="flex items-center p-4 bg-gray-300 dark:bg-gray-900 rounded">
            <div className="flex flex-shrink-0 items-center justify-center bg-green-200 h-16 w-16 rounded">
              <svg
                className="w-6 h-6 fill-current text-green-700"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-grow flex flex-col ml-4">
              <span className="text-xl font-bold"><div className="animate-pulse w-36 bg-gray-300 dark:bg-gray-500 h-6 rounded-md"></div></span>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Your Fitness Score</span>
                <span className="text-green-500 text-sm font-semibold ml-2">
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-10 px-24 pt-10">
        <div className="w-full rounded-lg p-8 bg-gray-300 dark:bg-gray-600">
          <h1 className="dark:text-white text-3xl font-semibold">Workouts</h1>
          <br />
          <div className="flex flex-col items-center">
            <div className="animate-pulse w-96 bg-gray-300 dark:bg-gray-500 h-96 rounded-full"></div>
          </div>
        </div>
        <div className="w-full rounded-lg p-8 bg-gray-300 dark:bg-gray-600">
          <h1 className="dark:text-white text-3xl font-semibold">
            Consistency
          </h1>
          <div>
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
      </div>
    </div>
    )
  }

  return (
    <div className="h-full dark:bg-gray-800">
      <Navbar loggedin />
      <Head>
        <title>BeFit - Statistics</title>
      </Head>
      <div className="flex flex-col items-center dark:text-white">
        <div className="pt-10">
          <div className="flex items-center p-4 bg-gray-300 dark:bg-gray-900 rounded">
            <div className="flex flex-shrink-0 items-center justify-center bg-green-200 h-16 w-16 rounded">
              <svg
                className="w-6 h-6 fill-current text-green-700"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-grow flex flex-col ml-4">
              <span className="text-xl font-bold">{fitnessScore}</span>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Your Fitness Score</span>
                <span className="text-green-500 text-sm font-semibold ml-2">
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-10 px-24 pt-10">
        <div className="w-full rounded-lg p-8 bg-gray-300 dark:bg-gray-600">
          <h1 className="dark:text-white text-3xl font-semibold">Workouts</h1>
          <Pie
            redraw
            data={{
              labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ],
              datasets: [
                {
                  label: "Workouts",
                  data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55],
                  backgroundColor: [
                    "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)",
                    "rgb(255, 205, 86)",
                    "rgb(232, 134, 96)",
                    "rgb(54, 83, 244)",
                    "rgb(255, 123, 19)",
                    "rgb(100, 99, 99)",
                    "rgb(50, 150, 200)",
                    "rgb(255, 255, 100)",
                    "rgb(255, 132, 132)",
                    "rgb(54, 205, 235)",
                    "rgb(25, 72, 86)",
                  ],
                  hoverOffset: 10,
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  labels: {
                    color: "rgb(255, 255, 255)",
                  },
                },
              },
            }}
          />
        </div>
        <div className="w-full rounded-lg p-8 bg-gray-300 dark:bg-gray-600">
          <h1 className="dark:text-white text-3xl font-semibold">
            Consistency
          </h1>
          <div className="chart-dark">
            <Line
              data={{
                labels: dates,
                datasets: [
                  {
                    label: "Workouts",
                    data: [day6.length, day5.length, day4.length, day3.length, day2.length, yesterday.length, today.length],
                    backgroundColor: "rgb(34, 53, 132)",
                    tension: 0.1,
                  },
                ],
              }}
              options={options}
            />
          </div>
          <div className="chart-light">
            <Line
              data={{
                labels: dates,
                datasets: [
                  {
                    label: "Workouts",
                    data: [day6.length, day5.length, day4.length, day3.length, day2.length, yesterday.length, today.length],
                    backgroundColor: "rgb(213, 100, 132)",
                    tension: 0.1,
                  },
                ],
              }}
              options={loptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
