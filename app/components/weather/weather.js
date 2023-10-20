import React, { useState, useEffect } from "react";
import axios from "axios";

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const getWeatherData = async (latitude, longitude) => {
    try {
      const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          getWeatherData(latitude, longitude);
        },
        (error) => {
          setError(error.message);
          console.error(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      {  error ? (
    <p>{error}</p>
  ) : weatherData ? (
    <div>
      <img
        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
        alt="icon"
      />
      <p>{weatherData.main.temp} °C</p>
      {/* <p>Feels Like: {weatherData.main.feels_like} °C</p> */}
      <p>{weatherData.weather[0].description}</p>
      <p>Humidity: {weatherData.main.humidity} %</p>
    </div>
  ) : (
    <p>Loading weather data...</p>
  )
}

    </div>
  );
}

export default Weather;
