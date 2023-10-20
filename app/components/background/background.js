import React, { useState, useEffect } from "react";

const Background = () => {
  const images = ['/img1.gif', '/img2.gif', '/img3.gif', '/img4.gif', '/img5.gif', '/img6.gif', '/img7.gif'];
  const [bgimg, setbgimg] = useState(`/img${Math.floor(Math.random() * images.length)}.gif`);

  useEffect(() => {
    const shuffle = setInterval(() => {
     
      const index = Math.floor(Math.random() * images.length);
      const img = images[index];
      setbgimg(img);
    }, 60000);

    return () => {
      clearInterval(shuffle);
    };
  }, []);

  return (
    <div className="img">
      <img src={bgimg} alt="lofi image" className="w-100 h-100"/>
    </div>
  );
};

export default Background;
