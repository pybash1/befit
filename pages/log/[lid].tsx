import { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import cookieCutter from "cookie-cutter";
import CopyToClipboard from "react-copy-to-clipboard";
import Modal from "react-modal";

import Navbar from "../../components/Navbar";
import EditModal from "../../components/EditModal";
import DeleteModal from "../../components/DeleteModal";

const Log: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [log, setLog] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDarkEditModal, setOpenDarkEditModal] = useState(false);
  const [openDarkDeleteModal, setOpenDarkDeleteModal] = useState(false);

  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/log/"
      : null;

  useEffect(() => {
    let lid =
      window.location.href.split("/")[
        window.location.href.split("/").length - 1
      ];
    fetch((API_URL + lid) as string, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieCutter.get("access-token")}`,
      },
    }).then((res) =>
      res.json().then((data) => {
        setLog(data);
        if (data) {
          setLoading(false);
        } else {
          window.location.href = "/404"
        }
      })
    );
  }, []);

  if (loading) {
    return <p>loading</p>;
  }

  const twitterLink = `https://twitter.com/intent/tweet?text=Check out this workout I just performed on BeFit!%0AWorkout Name: ${log.log.name}`;
  const copyLink = `Check out this workout I just performed on BeFit!\nWorkout Name: ${log.log.name}`;

  function openEditModalHandler() {
    setOpenEditModal(true);
  }
  
  function openDarkEditModalHandler() {
    setOpenDarkEditModal(true);
  }

  function closeEditModalHandler() {
    setOpenEditModal(false);
  }

  function closeDarkEditModalHandler() {
    setOpenDarkEditModal(false);
  }

  function openDeleteModalHandler() {
    setOpenDeleteModal(true);
  }

  function openDarkDeleteModalHandler() {
    setOpenDarkDeleteModal(true);
  }

  function closeDeleteModalHandler() {
    setOpenDeleteModal(false);
  }

  function closeDarkDeleteModalHandler() {
    setOpenDarkDeleteModal(false);
  }

  const darkModalStyles = {
    content: {
      top: "32%",
      left: "25%",
      right: "25%",
      bottom: "32%",
      backgroundColor: "#1f2937",
      border: "0px black"
    },
    overlay: {
      backgroundColor: "rgba(1, 1, 1, 0.25)",
    }
  }

  const modalStyles = {
    content: {
      top: "32%",
      left: "25%",
      right: "25%",
      bottom: "32%",
      border: "0px white"
    },
    overlay: {
      backgroundColor: "rgba(1, 1, 1, 0.25)",
    }
  }

  return (
    <div className="h-screen dark:bg-gray-800 dark:text-white">
      <Head>
        <title>BeFit - Log - {log.log.name}</title>
      </Head>
      <Modal style={darkModalStyles} isOpen={openDarkEditModal} onRequestClose={closeDarkEditModalHandler}><EditModal lid={log.key} date={log.log.date} /></Modal>
      <Modal style={darkModalStyles} isOpen={openDarkDeleteModal} onRequestClose={closeDarkDeleteModalHandler}><DeleteModal logname={log.log.name} lid={log.key} /></Modal>
      <Modal style={modalStyles} isOpen={openEditModal} onRequestClose={closeEditModalHandler}><EditModal lid={log.key} date={log.log.date} /></Modal>
      <Modal style={modalStyles} isOpen={openDeleteModal} onRequestClose={closeDeleteModalHandler}><DeleteModal logname={log.log.name} lid={log.key} /></Modal>
      <Navbar loggedin />
      <div className="lg:full w-full lg:pl-10 lg:pr-10 lg:py-6 mt-6 lg:mt-0">
        <h1 className="dark:text-white text-3xl title-font font-medium mb-1">
          {log.log.name}
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
        <div className="grid grid-cols-2 gap-10 text-center">
            <button onClick={openDarkEditModalHandler} className="modal-dark text-white bg-blue-500 border-0 py-2 focus:outline-none hover:bg-blue-600 rounded">
              Edit Log
            </button>
            <button onClick={openEditModalHandler} className="modal-light text-white bg-blue-500 border-0 py-2 focus:outline-none hover:bg-blue-600 rounded">
              Edit Log
            </button>
            <button onClick={openDarkDeleteModalHandler} className="modal-dark text-white bg-blue-500 border-0 py-2 focus:outline-none hover:bg-blue-600 rounded">
              Delete Log
            </button>
            <button onClick={openDeleteModalHandler} className="modal-light text-white bg-blue-500 border-0 py-2 focus:outline-none hover:bg-blue-600 rounded">
              Delete Log
            </button>
        </div>
      </div>
    </div>
  );
};

export default Log;
