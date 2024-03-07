"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Card.module.css';

const API_Key = 'ae9fe9f4adeaaccb1ec11fde930e54cc';

const getData = async (link) => {
  const res = await fetch(link);
  const data = await res.json();
  return data;
};

const Card = ({ forecastLocation, weatherData }) => {
  const [dailyForecasts, setDailyForecasts] = useState([]);
  

  useEffect(() => {
    
    const fetchData = async () => {
      const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=santiago%20de%20los%20caballeros&appid=${API_Key}&units=metric`;
      const dataForecast = await getData(urlForecast);

      // Group forecast data by date
      const groupedByDate = dataForecast.list.reduce((acc, forecast) => {
        const date = forecast.dt_txt.slice(0, 10);
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(forecast);
        return acc;
      }, {});

      const dailyForecasts = Object.values(groupedByDate);
      setDailyForecasts(dailyForecasts);
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <>
      {dailyForecasts.map((dailyForecast, index) => {
        // Get the maximum and minimum temperatures for the day
        const maxTemp = Math.max(...dailyForecast.map((item) => item.main.temp_max));
        const minTemp = Math.min(...dailyForecast.map((item) => item.main.temp_min));

        // Use the first item in the daily forecast to get the date
        const date = dailyForecast[0].dt_txt;

        return (
          <div key={index} className={styles.cardContainer}>
            <h5>{date}</h5>
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
