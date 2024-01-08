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
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  if (!weatherData) {
    // You might want to add loading state or error handling here
    return <div>Loading...</div>;
  }

  const today = new Date().toDateString();
  const arrToday = today.split(' ');

  return (
    <main className={styles.allSection}>
      <section className={styles.secPrincipal}>
        <Search />
        <div className={styles.imgContainer}>
          <Image
            src={'/my_location_FILL1_wght400_GRAD0_opsz48.svg'}
            width={30}
            height={30}
            alt='MyLocation'
          />
        </div>
        <div className={styles.clouds}></div>
        <div className={styles.weaImg}>
          <Image
            src={`/weather-app-master/${weatherData.weather[0].icon}.png`}
            fill
            style={{ objectFit: 'contain' }}
            alt='weather'
          />
        </div>
        <div className={styles.info}>
          <div className={styles.temp}>
            <h1>{Math.round(weatherData.main.temp)}</h1>
            <p>°C</p>
          </div>
          <h3>{capitalizarPalabras(weatherData.weather[0].description)}</h3>
          <span>
            Today • {arrToday[0]}, {Math.round(arrToday[2])} {arrToday[1]}
          </span>
          <div className={styles.location}>
            <Image
              src={'/location_on_FILL1_wght300_GRAD0_opsz48.svg'}
              width={24}
              height={24}
              alt='Location'
            />
            <span>{weatherData.name}</span>
          </div>
        </div>
      </section>

      <div className={styles.secCardsHigh}>
        <section className={styles.secCards}>
          <Card />
        </section>

        <section className={styles.secHigh}>
          <h4>Today&apos;s Hightlights</h4>
          <div className={styles.highCards}>
            <High high={weatherData} />
          </div>
        </section>
      </div>
    </main>
  );
};
function capitalizarPalabras(texto) {
  return texto.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}
export default Home;
