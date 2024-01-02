"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./High.module.css";

const API_Key = "f526d57399a0ff8feb9204cfbfd8765f";

const getWindDirection = (degree) => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(degree / 45) % 8;
  return directions[index];
};

const High = ({ high }) => {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=santiago%20de%20los%20caballeros&appid=${API_Key}&units=metric`;
      const res = await fetch(url);
      const data = await res.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const windDirection = getWindDirection(weatherData.wind.deg);
  const windDirectionRotation = `rotate(${weatherData.wind.deg}deg)`;

  return (
    <>
      <div className={styles.highContainer}>
        <span>Wind status</span>
        <h1>{Math.round(weatherData.wind.speed)} mph</h1>
        <div className={styles.windDirection}>
          <Image
            src="/arrow.svg"
            alt="Wind Direction"
            width={29.49} 
            height={29.49} 
            style={{ transform: windDirectionRotation, fill: 'blue' }}
          />

          <span>{windDirection}</span>
        </div>
      </div>
      <div className={styles.highContainer}>
        <span>Humidity</span>
        <h1>{weatherData.main.humidity} %</h1>
        <div className={styles.progressBarContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${weatherData.main.humidity}%` }}
          ></div>
        </div>
       
      </div>
      <div className={styles.highContainer}>
        <span>Visibility</span>
        <h1>{weatherData.visibility} miles</h1>
      </div>
      <div className={styles.highContainer}>
        <span>Air Pressure</span>
        <h1>{high.main.pressure} mb</h1>
      </div>
    </>
  );
};

export default High;
