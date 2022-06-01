import { useEffect, useState } from "react";
import cookieCutter from 'cookie-cutter';
import toast, { Toaster } from "react-hot-toast";

function DeleteModal(props: any) {
    const [logName, setLogName] = useState("");
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (logName === props.logname) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [logName])

    const deleteLog = () => {
        const API_URL = process.env.NODE_ENV === "development" ? "http://localhost:8000/delete/log/"+props.lid : null;
        fetch(API_URL as string, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+cookieCutter.get("access-token")
            }
        }).then(res => res.json().then(data => {
            if (data) {
                toast.success("Successfully Deleted Log")
                window.location.href="/progress"
            } else {
                toast.error("Failed to Delete Log!")
            }
        }))
    }

    return (
        <>
            <Toaster />
            <h2 className="text-3xl dark:text-white text-center font-semibold">Delete Log</h2>
            <br />
            <div className="flex flex-col items-center">
                <div className="flex flex-row">
                    <p className="text-red-500 font-bold">Are you sure you want to delete this log? Type</p>
                    <strong className="dark:text-white font-normal">&nbsp;{props.logname}&nbsp;</strong>
                    <p className="text-red-500 font-bold">to verify</p>
                </div>
            </div>
            <br />
            <div className="flex flex-col items-stretch">
                <div className="px-36">
                    <input value={logName} onChange={(e) => {setLogName(e.target.value)}} type="text" className="w-full py-3 pl-4 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" placeholder={props.logname} />
                </div>
                &nbsp;
                <div className="flex flex-col items-center">
                    {disabled ? 
                    <button className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-400 rounded-md cursor-not-allowed">Delete Log</button>
                    :
                    <button onClick={deleteLog} className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                        Delete Log
                    </button>}
                </div>
            </div>
        </>
    )
}

export default DeleteModal;