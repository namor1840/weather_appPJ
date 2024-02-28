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


  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=santiago%20de%20los%20caballeros&appid=${API_Key}&units=metric`;
      const res = await fetch(url);
      const data = await res.json();
      setWeatherData(data);
    };

    fetchData();
  }, []);

  const handleSearch = (selectedCity) => { // Function definition moved outside the useEffect hook
    // Fetch weather data for the selected city
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity.name}&appid=${API_Key}&units=metric`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data);
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
          <Card />
        </section>

        <section className={styles.secHigh}>
          <h4>Today's Highlights</h4>
          <div className={styles.highCards}>
            <High high={weatherData} />
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