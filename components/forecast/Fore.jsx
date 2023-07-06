import Image from 'next/image'
import styles from './Fore.module.css'

const API_Key = '608aa8411698ca2511927838a7977ba2'

const getData = async (link) => {
    const res = await fetch(link)
    const data = await res.json()
    return data
}

export default async function Card() {

    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=19.0386&lon=-98.196&appid=${API_Key}&units=metric`
    const dataForecast = await getData(urlForecast)
    const forecastList = (dataForecast.list)
    const listFiltered = []

    forecastList.forEach(list => {
        if ((list.dt_txt).slice(11, 13) === '12') {
            listFiltered.push(list)
        }
    });

    return (
        <>
            {
                listFiltered.map((fore, index) => {
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
                    )
                })
            }
        </>
    )
}
