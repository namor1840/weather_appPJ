import styles from './High.module.css';

export default function High({ high }) {
  const humidityPercentage = high.main.humidity;

  return (
    <>
      <div className={styles.highContainer}>
        <span>Wind status</span>
        <h1>{Math.round(high.wind.speed)} mph</h1>
      </div>
      <div className={styles.highContainer}>
        <span>Humidity</span>
        <div className={styles.progressBarContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${humidityPercentage}%` }}
          ></div>
        </div>
        <h1>{humidityPercentage} %</h1>
      </div>
      <div className={styles.highContainer}>
        <span>Visibility</span>
        <h1>{high.visibility} miles</h1>
      </div>
      <div className={styles.highContainer}>
        <span>Air Pressure</span>
        <h1>{high.main.pressure} mb</h1>
      </div>
    </>
  );
}
