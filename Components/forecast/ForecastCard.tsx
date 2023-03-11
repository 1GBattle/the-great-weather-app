import ForecastModel from '@/Models/ForecastModel'
import styles from '@/styles/ForecastCard.module.css'
import Image from 'next/image'

interface Props {
	icon: string
	forecast: ForecastModel
}

export default function ForecastCard({ icon, forecast }: Props) {
	return (
		<div className={styles.wrapper}>
			<div className={`${styles.cardContainer}`}>
				<div className={`${styles.cardContent}`}>
					<div className={`${styles.mainContent} flex-column`}>
						<div className={styles.cityContent}>
							<h3 className={styles.forecastDate}>
								{new Date(forecast.date).toLocaleDateString('en-us', {
									weekday: 'short',
									year: 'numeric',
									month: 'short',
									day: 'numeric'
								})}
							</h3>
						</div>
						<div className={`${styles.weatherImg} flex-center`}>
							<Image src={icon} alt='weather icon' width={56} height={56} priority />
						</div>

						<div className={`${styles.tempContainer}`}>
							<p className={styles.condition}>{forecast.day.condition.text}</p>
							<div className={styles.avgTemp_f}>
								<p>Avg: {forecast.day.avgtemp_f} °F</p>
							</div>

							<div className={styles.will_it_rain}>
								<p className={styles.chanceOfRain}>
									Rain: {forecast.day.daily_chance_of_rain}%
								</p>
							</div>
						</div>
						<div className={`${styles.sunTimesContainer} flex-column`}>
							<p>Sunrise: {forecast.astro.sunrise.slice(0, -2)}</p>
							<p>Sunset: {forecast.astro.sunset.slice(0, -2)}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
