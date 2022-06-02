import Head from "next/head";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import Navbar from "../components/Navbar";

const Meditation = () => {
  const [mood, setMood] = useState(-1);

  const music = [
    "/music1.mp3",
    "/music2.mp3",
    "/music3.mp3",
    "/music4.mp3",
  ];
  
  const startMeditation = () => {
    document.getElementById("start-btn").className = "hidden";
    document.getElementById("mood-select").className = "";
  };

  const startMeditation_ = () => {
    if (mood <= 0 || mood >= 4) {
      toast("😐  Select a mood first!");
    } else {
      document.getElementById("mood-select").className = "hidden";
      document.getElementById("started").className = "text-center";
      document.getElementById("audio").play();
    }
  };

  const stopMeditation = () => {
    document.getElementById("audio").pause();
    document.getElementById("start-btn").className = "";
    document.getElementById("mood-select").className = "hidden";
    document.getElementById("started").className = "text-center hidden";
  };

  return (
    <div className="h-screen dark:bg-gray-800 dark:text-white flex items-center justify-center">
      <Head>
        <title>BeFit - Meditation</title>
      </Head>
      <Toaster
        position="bottom-center"
        toastOptions={{ style: { background: "#111827", color: "#fff" } }}
      />
      <div className="absolute top-0 left-0 right-0">
        <Navbar loggedin />
      </div>
      <div id="main">
          <div id="start-btn">
            <button
            id="start-btn"
            onClick={startMeditation}
            className="bg-gradient-to-tr from-blue-600 to-blue-400 text-white font-semibold py-3 px-8 rounded-lg"
            >
            Start Meditation
            </button>
          </div>
        <div id="mood-select" className="hidden">
          <h2 className="text-2xl font-semibold flex flex-col items-center">
            Select Your Mood
          </h2>
          <ul className="grid grid-cols-3 gap-x-5 m-10 max-w-md mx-auto">
            <li
              onClick={() => {
                setMood(1);
              }}
              className="relative"
            >
              <input
                className="sr-only peer"
                type="radio"
                value="yes"
                name="answer"
                id="answer_happy"
              />
              <label
                className="flex items-center justify-center p-5 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-300 dark:hover:bg-gray-700 peer-checked:ring-green-500 peer-checked:ring-2 peer-checked:border-transparent"
                htmlFor="answer_happy"
              >
                Happy😄
              </label>
            </li>
            <li
              onClick={() => {
                setMood(2);
              }}
              className="relative"
            >
              <input
                className="sr-only peer"
                type="radio"
                value="no"
                name="answer"
                id="answer_sad"
              />
              <label
                className="flex items-center justify-center p-5 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-300 dark:hover:bg-gray-700 peer-checked:ring-yellow-500 peer-checked:ring-2 peer-checked:border-transparent"
                htmlFor="answer_sad"
              >
                Sad😔
              </label>
            </li>
            <li
              onClick={() => {
                setMood(3);
              }}
              className="relative"
            >
              <input
                className="sr-only peer"
                type="radio"
                value="maybe"
                name="answer"
                id="answer_angry"
              />
              <label
                className="flex items-center justify-center p-5 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-300 dark:hover:bg-gray-700 peer-checked:ring-red-500 peer-checked:ring-2 peer-checked:border-transparent"
                htmlFor="answer_angry"
              >
                Angry😠
              </label>
            </li>
          </ul>
          <div className="flex flex-col items-center">
            <button
              id="start-final-btn"
              onClick={startMeditation_}
              className="bg-gradient-to-tr from-blue-600 to-blue-400 text-white font-semibold py-2 px-8 rounded-lg"
            >
              Start
            </button>
          </div>
          <br />
          <p className="text-xs text-gray-400">Psst! More moods coming soon!</p>
        </div>
        <div id="started" className="text-center hidden">
          Selected Mood:{" "}
          {mood === 1
            ? "Happy"
            : mood === 2
            ? "Sad"
            : mood === 3
            ? "Angry"
            : "Unknown"}
          <br />
          Take a deep breath and relax.
          <br />
          <audio id="audio">
              <source src={music[Math.floor(Math.random()*music.length)]}></source>
          </audio>
          <br />
          <button
            id="stop-btn"
            onClick={stopMeditation}
            className="bg-gradient-to-tr from-blue-600 to-blue-400 text-white font-semibold py-2 px-8 rounded-lg"
          >
            Stop
          </button>
          <div className="bubble">
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meditation;
