"use client"
import Image from 'next/image';
import styles from './Search.module.css';
import { useState } from 'react';

const API_Key = 'f526d57399a0ff8feb9204cfbfd8765f';

const cities = [
  { name: "Santiago de los Caballeros", lat: 19.4517, lon: -70.6987 },
  { name: "London", lat: 51.505, lon: -0.09 },
  { name: "New York City", lat: 40.7128, lon: -74.0059 },
  { name: "Tokyo", lat: 35.6895, lon: 139.6917 },
  { name: "Paris", lat: 48.8566, lon: 2.3522 },
  { name: "Berlin", lat: 52.5238, lon: 13.4127 },
  { name: "Rome", lat: 41.9028, lon: 12.4963 },
  { name: "São Paulo", lat: -23.5505, lon: -46.6333 },
  { name: "Sydney", lat: -33.8688, lon: 151.2093 },
  { name: "Moscow", lat: 55.7558, lon: 37.6173 },
  { name: "Buenos Aires", lat: -34.8577, lon: -56.1333 },
  { name: "Mexico City", lat: 19.4326, lon: -99.1332 },
  { name: "Santo Domingo", lat: 18.4667, lon: -6},
  { name: "Bogotá", lat: 4.6097, lon: -74.081},
];


export default function Search({ onSearch }) {
  const [botonState, setBotonState] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null); // New state variable

  function showSearch() {
    setBotonState(!botonState);
  }

  function handleCityChange(event) {
    setSelectedCity(event.target.value); // Set selected city based on dropdown value
  }

  function handleSearch() {
    if (selectedCity) {
      onSearch({ name: selectedCity }); // Pass city name to parent
      setBotonState(false); // Close the search container after searching
    }
  }

  return (
    <>
      {botonState ? (
        <div className={styles.searchContainer}>
          <div className={styles.close}>
            <Image
              src={'/close_FILL0_wght400_GRAD0_opsz48.svg'}
              width={30}
              height={30}
              alt="close"
              onClick={showSearch}
            />
          </div>
          <div className={styles.searchAndButton}>
            <select value={selectedCity} onChange={handleCityChange}>
              <option value="">Select a City</option>
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
            <button onClick={handleSearch} type="button">
              Show weather
            </button>
          </div>
        </div>
      ) : (
        <button type="button" className={styles.botonSearch} onClick={showSearch}>
          Change City
        </button>
      )}
    </>
  );
}
