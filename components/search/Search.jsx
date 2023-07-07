"use client"
import Image from 'next/image';
import styles from './Search.module.css';
import { useState } from 'react';

const API_Key = 'f526d57399a0ff8feb9204cfbfd8765f';

const getDataInput = async (urlSearch) => {
  const res = await fetch(urlSearch);
  const inputData = await res.json();
  return inputData;
};

export default function Search({ onSearch }) {
  const [botonState, setBotonState] = useState(false);
  const [inputValue, setInputValue] = useState('');

  function showSearch() {
    setBotonState(!botonState);
  }

  function seachPlace(e) {
    setInputValue(e.target.value);
  }

  async function seachPlaceButton() {
    const urlSearch = `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=3&appid=${API_Key}`;
    const places = await getDataInput(urlSearch);
    console.log(places);
    // Realizar acciones con los lugares encontrados
    onSearch(places);
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
              alt='close'
              onClick={showSearch}
            />
          </div>
          <div className={styles.searchAndButton}>
            <div className={styles.searchLocationContainer}>
              <Image
                src={'/search_FILL0_wght400_GRAD0_opsz48.svg'}
                width={24}
                height={24}
                alt='search'
              />
              <input
                onChange={seachPlace}
                value={inputValue}
                className={styles.searchLocation}
                type='text'
                placeholder='search location'
              />
            </div>
            <button onClick={seachPlaceButton} type='button'>
              Search
            </button>
          </div>
        </div>
      ) : (
        <button type='button' className={styles.botonSearch} onClick={showSearch}>
          Search for places
        </button>
      )}
    </>
  );
}
