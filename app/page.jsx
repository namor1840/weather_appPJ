import Image from 'next/image'
import styles from './page.module.css'
import Card from '@/components/card/Card'
import High from '@/components/high/High'
import Search from '@/components/search/Search'

const API_Key = 'f526d57399a0ff8feb9204cfbfd8765f'
const today = new Date().toDateString()
const arrToday = today.split(' ')

const getData = async () => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=19.451054&lon=-70.697917&appid=${API_Key}&units=metric`
  const res = await fetch(url)
  const data = await res.json()
  return data
}

export default async function Home() {
  const data = await getData()

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
            src={`/weather-app-master/${data.weather[0].icon}.png`}
            fill
            style={{objectFit: 'contain'}}
            alt='weather'
          />
        </div>
        <div className={styles.info}>
          <div className={styles.temp}>
            <h1>{Math.round(data.main.temp)}</h1><p>°C</p>
          </div>
          <h3>{data.weather[0].description}</h3>
          <span>Today • {arrToday[0]}, {Math.round(arrToday[2])} {arrToday[1]}</span>
          <div className={styles.location}>
            <Image
              src={'/location_on_FILL1_wght300_GRAD0_opsz48.svg'}
              width={24}
              height={24}
              alt='Location'
            />
            <span>{data.name}</span>
          </div>
        </div>
      </section>

      <div className={styles.secCardsHigh}>

        <section className={styles.secCards}>
          <Card />
        </section>

        <section className={styles.secHigh}>
          <h4>Today&#8217;s Hightlights</h4>
          <div className={styles.highCards}>
            <High high={data} />
          </div>
        </section>
      </div>
    </main>
  )
}