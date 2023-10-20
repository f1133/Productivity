
import React, { useState, useEffect,useRef  } from "react";

function todolist() {
    const [checklistInput, setchecklistInput] = useState("");
    const [dataArray, setDataArray] = useState([]);
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

    const handleRemoveItem = (index) => {
        if (index < 0 || index >= dataArray.length) {
         
          console.error("Invalid index");
          return;
        }
      
        const newDataArray = dataArray.filter((_, i) => i !== index);
        setDataArray(newDataArray);
      };
  return (
   
    <div className="bg-gray-500 bg-opacity-40 p-4 flex flex-col justify-center items-start">
    <span className="flex justify-between ">
    <input
       type="text"
       value={checklistInput}
       onChange={handleInputChange}
       className="px-2 py-1  rounded mb-2 font-darkGray "
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
 
  )
}

export default todolist