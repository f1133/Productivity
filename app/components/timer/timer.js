import React, { useState, useEffect,useRef  } from "react";

function timer() {
    const [timer, settimer] = useState(1500);
    const [isActive, setisActive] = useState(false);
    const [status, setStatus] = useState("Start");
    const [shortbreak, setShortBreak] = useState("5mins break");
    useEffect(() => {
        var countdown = null;
        if (isActive && timer >0) {
          countdown = setInterval(() => {
            settimer((timer) => timer - 1);
          }, 1000);
        }
      
        return () => {
          clearInterval(countdown);
        };
      }, [isActive,timer]);
      
      const btn1 = () => {
        if (status === "Start" && !isActive) {
          setStatus("Stop");
          setisActive(true);
        } else {
          setStatus("Start");
          setisActive(false);
        }
      };
    
      const startBreak = () => {
        if (shortbreak === "5mins break") {
          setShortBreak("break started");
          alert("Stretch and hydrate")
          setisActive(true);
          settimer(300);
        } else {
          setShortBreak("5mins break");
          setisActive(false);
          settimer(1500);
        }
      };
      
  return (
    <div className="bg-gray-700 bg-opacity-25 p-4 flex flex-col justify-start items-center">
    <p className="font-sans text-8xl mb-4">
      {Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" : ""}{timer % 60}
    </p>
    <button
      className={`bg-transparent text-black py-2 px-4 rounded  border border-spacing-1 border-r-amber-200 ${
        isActive ? "bg-red-500" : "bg-green-500"
      }`}
      onClick={btn1}
    >
      {status}
    </button>
    <button className="bg-transparent text-black py-2 px-4 mt-2 border rounded" onClick={()=>{settimer(1500),setisActive(false)}}>Reset</button>

    <button
      className="bg-transparent text-black  border py-2 px-4 mt-2 rounded"
      onClick={startBreak}
    >
      {shortbreak}
    </button>
  </div>
  )
}

export default timer