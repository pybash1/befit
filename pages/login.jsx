import Head from "next/head";
import { useEffect, useState } from "react";
import cookieCutter from "cookie-cutter";
import toast, { Toaster } from "react-hot-toast";

import Navbar from "../components/Navbar";

const Login = () => {
  useEffect(() => {
    if (
      cookieCutter.get("access-token") !== null ||
      cookieCutter.get("access-token") !== undefined ||
      cookieCutter.get("access-token") !== ""
    ) {
      let API_URL =
        process.env.NODE_ENV === "development"
          ? "http://localhost:8000/checkjwt"
          : "https://befit.up.railway.app";;
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    let API_URL =
      process.env.NODE_ENV === "development"
        ? "http://localhost:8000/login"
        : "https://befit.up.railway.app";;
    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((data) => {
        if (data.access_token !== undefined) {
          let today = new Date();
          let exp = new Date(today);
          exp.setDate(exp.getDate() + 30);
          cookieCutter.set("access-token", data.access_token, {
            expires: exp,
          });
          window.location.href = "/dashboard";
        } else {
          toast.error(data.message);
        }
      });
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800">
      <Head>
        <title>BeFit - Login</title>
      </Head>
      <Toaster
        toastOptions={{ style: { background: "#111827", color: "#fff" } }}
      />
      <Navbar />
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-4xl font-bold text-white">BeFit</h2>

              <p className="max-w-xl mt-3 text-gray-300">
                Start tracking your workouts, hikes, runs. Get notifications and
                recommendations. Easily visualize your performance and
                consistency.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">
                Login
              </h2>

              <p className="mt-3 text-gray-500 dark:text-gray-300">
                Login to your account to start tracking your workouts!
              </p>
            </div>

            <div className="mt-8">
              <form onSubmit={handleLogin}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  >
                    Email Address
                  </label>
                  <input
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="example@example.com"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="text-sm text-gray-600 dark:text-gray-200"
                    >
                      Password
                    </label>
                  </div>

                  <input
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your Password"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  <button
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
              </form>

              <p className="mt-6 text-sm text-center text-gray-400">
                Don&#x27;t have an account yet?{" "}
                <a
                  href="#"
                  className="text-blue-500 focus:outline-none focus:underline hover:underline"
                >
                  Sign up
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
