"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import Card from '@/components/card/Card';
import High from '@/components/high/High';
import Search from '@/components/search/Search';

const API_Key = 'f526d57399a0ff8feb9204cfbfd8765f';


const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=santiago%20de%20los%20caballeros&appid=${API_Key}&units=metric`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=santiago%20de%20los%20caballeros&appid=${API_Key}&units=metric`;
      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();
      setWeatherData(weatherData);

      const forecastResponse = await fetch(forecastUrl);
      const forecastData = await forecastResponse.json();
      setForecastData(forecastData);
    };

    fetchData();
  }, []);

  const handleSearch = (selectedCity) => {
    // Fetch weather data for the selected city
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity.name}&appid=${API_Key}&units=metric`;
    fetch(weatherUrl)
      .then((res) => res.json())
      .then((weatherData) => {
        setWeatherData(weatherData);
        setSelectedLocation(selectedCity.name); // Set the selected location
      });
  
    // Fetch forecast data for the selected city
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity.name}&appid=${API_Key}&units=metric`;
    fetch(forecastUrl)
      .then((res) => res.json())
      .then((forecastData) => {
        setForecastData(forecastData);
      });
  };


  if (!weatherData) {
    return <div>Loading...</div>;
  }


  const today = new Date().toDateString();
  const arrToday = today.split(" ");

  const { temp, main: { feels_like, humidity }, weather, name } = weatherData; // Extract relevant data

  return (
    <main className={styles.allSection}>
      <section className={styles.secPrincipal}>
      <Search onSearch={handleSearch} />     
           <div className={styles.imgContainer}>
          <Image
            src={"/my_location_FILL1_wght400_GRAD0_opsz48.svg"}
            width={30}
            height={30}
            alt="MyLocation"
          />
        </div>
        <div className={styles.clouds}></div>
        <div className={styles.weaImg}>
          <Image
            src={`/weather-app-master/${weather[0].icon}.png`}
            fill
            style={{ objectFit: "contain" }}
            alt="weather"
          />
        </div>
        <div className={styles.info}>
          <div className={styles.temp}>
            <h1>{Math.round(weatherData.main.temp)}</h1>
            <p>°C</p>
          </div>
          <h3>{capitalizarPalabras(weather[0].description)}</h3>
          <span>
            Feels like: {Math.round(feels_like)}°C • Humidity: {humidity}%
          </span>
          <span>
            Today • {arrToday[0]}, {Math.round(arrToday[2])} {arrToday[1]}
          </span>
          <div className={styles.location}>
            <Image
              src={"/location_on_FILL1_wght300_GRAD0_opsz48.svg"}
              width={24}
              height={24}
              alt="Location"
            />
            <span>{name}</span>
          </div>
        </div>
      </section>

      <div className={styles.secCardsHigh}>
        <section className={styles.secCards}>
        <Card location={selectedLocation} weatherData={weatherData} forecastData={forecastData} />
          </section>

        <section className={styles.secHigh}>
          <h4>Today&apos;s Highlights</h4>
          <div className={styles.highCards}>
          <High location={selectedLocation} high={weatherData} />
          </div>
        </section>
      </div>
    </main>
  );
};

function capitalizarPalabras(texto) {
  return texto.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

export default Home;