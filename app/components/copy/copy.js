import React, { useState, useEffect,useRef  } from "react";

function copy() {
    const textareaRef = useRef(null);
    const handleCopy = () => {
        if (textareaRef.current) {
          textareaRef.current.select();
          document.execCommand("copy");
        }
      };
  return (
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
  )
}

export default copy