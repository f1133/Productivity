'use client'
import React, { useState, useEffect,useRef  } from "react";

export default function clock() {
    const [time_val, settime_val] = useState(new Date());
    useEffect(() => {
        let clock = setInterval(() => {
          settime_val(new Date());
        }, 100);
    
        return () => {
          clearInterval(clock);
        };
      }, []);
    
  return (
    <div className="bg-transparent p-4 flex-grow flex-col justify-start items-start">
    <h1 className="font-extrabold text-2xl mb-4 text-red-500">
  {time_val.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}
</h1>
<p>
  {time_val.toLocaleDateString(undefined, {
    weekday: "long",
  
    month: "long",
    day: "numeric",
  })}
</p>

    
  </div>
  )
}
