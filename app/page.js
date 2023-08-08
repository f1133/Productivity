
'use client'

import React, { useState, useEffect,useRef  } from "react";
import axios from "axios";

export default function Home() {
  const [time_val, settime_val] = useState(new Date());
  const [bgimg, setbgimg] = useState("/img1.jpg");
  const [timer, settimer] = useState(1500);
  const [isActive, setisActive] = useState(false);
  const [status, setStatus] = useState("Start");
  const [shortbreak, setShortBreak] = useState("5mins break");
  const [checklistInput, setchecklistInput] = useState("");
  const [dataArray, setDataArray] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [data, setData] = useState(null);
  const textareaRef = useRef(null);

  
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

useEffect(() => {
  const shuffle = setInterval(() => {
    const images = ['/img1.jpg', '/img2.jpg', '/img2.jpg']; // Correct the array of image names
    const index = Math.floor(Math.random() * images.length);
    const img = images[index]; // Use the correct array name
    setbgimg(img);
  }, 60000);
  
  return () => {
    clearInterval(shuffle);
  }
}, []);



  const handleInputChange = (e) => {
    if (e.target.value.trim() !== '') {
      setchecklistInput(e.target.value);
    }
  };

  const handleAddInput = () => {
    if(checklistInput.trim()!=='')
   { setDataArray([...dataArray, checklistInput]);
    setchecklistInput("");}
  else 
    {
      alert("Please enter text before adding task")
    }
  };
useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error(error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      const API_KEY = process.env.NEXT_PUBLIC_API_KEY ;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [latitude, longitude]);


  
  useEffect(() => {
    let clock = setInterval(() => {
      settime_val(new Date());
    }, 100);

    return () => {
      clearInterval(clock);
    };
  }, []);

 

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
      setisActive(true);
      settimer(300);
    } else {
      setShortBreak("5mins break");
      setisActive(false);
      settimer(1500);
    }
  };
  const handleRemoveItem = (index) => {
    if (index < 0 || index >= dataArray.length) {
     
      console.error("Invalid index");
      return;
    }
  
    const newDataArray = dataArray.filter((_, i) => i !== index);
    setDataArray(newDataArray);
  };
  const handleCopy = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
      document.execCommand("copy");
    }
  };
  return (

<div className={`grid grid-cols-2 gap-8`} style={{ backgroundImage: `url(${bgimg})` }}>

  {/* Left Column */}
  <div className="bg-transparent p-4 flex-grow flex-col justify-start items-start">
    <h1 className="font-extrabold text-2xl mb-4  text-red-500">
      {time_val.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </h1>
    {data && (
      <div className="flex flex-col items-start mb-4 text-blue-500">
        <p>Temperature: {data.main.temp} °C</p>
        <p>{data.weather[0].description}</p>
        <img
          className="h-10 w-10 align-right"
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
          alt="icon"
        />
        <p>Humidity: {data.main.humidity} %</p>
        <p>Feels Like: {data.main.feels_like} °C</p>
      </div>
    )}
  </div>

  {/* Right Column */}
  <div className="bg-gray-700 bg-opacity-25 p-4 flex flex-col justify-start items-center">
    <p className="font-sans text-8xl mb-4">
      {Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" : ""}{timer % 60}
    </p>
    <button
      className={`bg-blue-500 text-white py-2 px-4 rounded ${
        isActive ? "bg-red-500" : "bg-green-500"
      }`}
      onClick={btn1}
    >
      {status}
    </button>
    <button className="bg-yellow-500 text-white py-2 px-4 mt-2 rounded" onClick={()=>{settimer(1500),setisActive(false)}}>Reset</button>
    <br />
    <button
      className="bg-blue-500 text-white py-2 px-4 mt-2 rounded"
      onClick={startBreak}
    >
      {shortbreak}
    </button>
  </div>

  {/* Checklist */}
  <div className="bg-gray-500 bg-opacity-40 p-4 flex flex-col justify-center items-start">
   <span className="flex justify-between ">
   <input
      type="text"
      value={checklistInput}
      onChange={handleInputChange}
      className="px-2 py-1 border rounded mb-2 font-darkGray"
      placeholder="Add a task..."
    />
    <button
      onClick={handleAddInput}
      className="bg-green-500 text-white py-1 px-2 rounded align-middle"
    >
      Add Task
    </button>
    </span> 
    <ul className="list-disc pl-8 mt-4">
      {dataArray.map((text, index) => (
        <li key={index} className="mb-2 list-none">
          <label className="flex ">
            <input type="checkbox" className="mr-2 " />
            {text}
            <button
              className="text-red-500 ml-2"
              onClick={() => handleRemoveItem(index)}
            >
              Remove
            </button>
          </label>
        </li>
      ))}
    </ul>
  </div>
  <div>
  <textarea
        ref={textareaRef}
        defaultValue="This is the content you can copy"
        rows="4"
        cols="50"
        className="overflow-scroll"
      />
      <button onClick={handleCopy} className="bg-blue-500 text-white py-2 px-4 rounded">
        Copy to Clipboard
      </button>

  </div>
 
</div>

  );
}
