import { useEffect, useState } from "react";
import cookieCutter from 'cookie-cutter';
import toast, { Toaster } from "react-hot-toast";

function EditModal(props: any) {
    const [logName, setLogName] = useState("");
    const [logType, setLogType] = useState("Workout");
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (logName !== "" && (logType === "Workout" || logType === "Exercise" || logType === "Hike" || logType === "Run" || logType === "Walk")) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [logName, logType]);

    const editLog = () => {
        const API_URL = process.env.NODE_ENV === "development" ? "http://localhost:8000/update/log/"+props.lid : "https://befit.up.railway.app";
        let logType_ = logType === "Hike" || logType === "Run" || logType === "Walk" ? "Hike/Run/Walk" : logType;
        fetch(API_URL as string, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookieCutter.get("access-token")}`,
            },
            body: JSON.stringify({
                name: logName,
                type: logType_,
                date: props.date,
            }),
        }).then(res => res.json().then(data => {
            if (data) {
                toast.success("Successfully Updated Log")
                window.location.href="/log/"+props.lid;
            } else {
                toast.error("Failed to Update Log!")
            }
        }))
    }

    return (
        <>
            <Toaster />
            <h2 className="text-3xl dark:text-white text-center font-semibold">Edit Log</h2>
            <br />
            <div className="flex flex-col items-stretch">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="name">Log Name</label>
                        <input value={logName} onChange={(e) => {setLogName(e.target.value)}} id="name" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                    </div>
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="logtype">Log Type</label>
                        <select
                            value={logType}
                            onChange={(e) => {setLogType(e.target.value)}}
                            id="type"
                            className="w-full py-3 px-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        >
                            <option>Workout</option>
                            <option>Exercise</option>
                            <option>Hike</option>
                            <option>Run</option>
                            <option>Walk</option>
                        </select>
                    </div>
                </div>
                &nbsp;
                <div className="flex flex-col items-center">
                    {disabled ?
                    <button className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-400 rounded-md cursor-not-allowed">Edit Log</button>
                    :
                    <button onClick={editLog} className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                        Edit Log
                    </button>}
                </div>
            </div>
        </>
    )
}

export default EditModal;