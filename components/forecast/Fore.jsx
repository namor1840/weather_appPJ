"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Fore.module.css';

const API_Key = 'f526d57399a0ff8feb9204cfbfd8765f';

const getData = async (link) => {
  const res = await fetch(link);
  const data = await res.json();
  return data;
};

export default function Card() {
  const [city, setCity] = useState('Santiago de los Caballeros'); // Ciudad por defecto
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=santiago%20de%20los%20caballeros&appid=${API_Key}&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
        console.log('API Response:', data);
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <>
      {forecastData.map((fore, index) => {
        return (
          <div key={index} className={styles.cardContainer}>
            <h5>{fore.dt_txt}</h5>
            <div className={styles.img}>
              <Image
                src={`/weather-app-master/${fore.weather[0].icon}.png`}
                fill
                style={{ objectFit: 'contain' }}
                alt='weather'
              />
            </div>
            <div className={styles.deegres}>
              <span>{Math.round(fore.main.temp_max)}°C</span>
              <span className={styles.lastchild}>{Math.round(fore.main.temp_min)}°C</span>
            </div>
          </div>
        );
      })}
    </>
  );
}
