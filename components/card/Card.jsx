"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Card.module.css';

const API_Key = 'f526d57399a0ff8feb9204cfbfd8765f';

const Card = ({ weatherData, forecastData }) => {
  // Use the forecastData here


  const [dailyForecasts, setDailyForecasts] = useState([]);
  

  useEffect(() => {
    if (forecastData && forecastData.list) { // Check if forecastData and forecastData.list are defined
      // Group forecast data by date
      const groupedByDate = forecastData.list.reduce((acc, forecast) => {
        const date = forecast.dt_txt.slice(0, 10);
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(forecast);
        return acc;
      }, {});
  
      const dailyForecasts = Object.values(groupedByDate);
      setDailyForecasts(dailyForecasts);
    }
  }, [forecastData]); // Dependency on forecastData

  return (
    <>
      {dailyForecasts.map((dailyForecast, index) => {
        // Get the maximum and minimum temperatures for the day
        const maxTemp = Math.max(...dailyForecast.map((item) => item.main.temp_max));
        const minTemp = Math.min(...dailyForecast.map((item) => item.main.temp_min));
        const date = new Date(dailyForecast[0].dt_txt);
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
        const dayOfMonth = date.getDate();
        const month = date.toLocaleDateString('en-US', { month: 'long' });
        const year = date.getFullYear();
        const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;

        // Use the first item in the daily forecast to get the date
        // const date = dailyForecast[0].dt_txt;

        return (
          <div key={index} className={styles.cardContainer}>
            <h5>{formattedDate}</h5>
            <div className={styles.img}>
              <Image
                src={`/weather-app-master/${dailyForecast[0].weather[0].icon}.png`}
                fill
                style={{ objectFit: 'contain' }}
                alt='weather'
              />
            </div>
            <div className={styles.deegres}>
              <span>{Math.round(maxTemp)}°C</span>
              <span className={styles.lastchild}>{Math.round(minTemp)}°C</span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Card;
