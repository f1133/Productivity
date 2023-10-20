
'use client'
import React from "react";
import Background from "./components/background/background"; // Import with uppercase "B"
import Clock from "./components/clock/clock";
import Timer from "./components/timer/timer";
import Todolist from "./components/todolist/todolist";
import Weather from "./components/weather/weather";
import Quote from "./components/qoute/qoute";
import Music from "./components/music/music";
import Chatbot from "./components/chatbot/chatbot";
export default function Home() {
  return (
    <div className="" >
   
    <div className="align-left">
      <Clock/>
      <Weather/> 
      </div>
      <div><Music/></div>
    <div className=" flex align-text-bottom "><Background /></div>   
    <div><Todolist/></div>
    <div><Chatbot/></div>
   <div className=" align-left "><Timer/></div>  
   
    <Quote/>
    </div>
  );
}
