import React from 'react'
import styles from '@/styles/CurrentTempCard.module.css'
import Image from 'next/image'
import { useAppSelector } from '@/redux/hooks'

export default function CurrentTempCard() {
	const currentWeather = useAppSelector((state) => state.weather.currentWeather)

	const { temp_c, temp_f, condition, wind_mph } = currentWeather.current
	const { localtime, name } = currentWeather.location

	const windProfile = () => {
		if (wind_mph < 12.5) {
			return 'Calm'
		} else if (wind_mph < 25) {
			return 'Light'
		}
		return 'Strong'
	}
	return (
		<div className={styles.wrapper}>
			<div className={`${styles.cardContainer}`}>
				<div className={`${styles.cardContent} flex-column`}>
					<div className='flex-column'>
						<div className={styles.cityContent}>
							<p className={styles.tempCity}>Now in {name}</p>
							<p className={styles.localTime}>
								{new Date(localtime).toDateString()}
							</p>
						</div>

						<div className={`${styles.weatherImg} flex-center box-shadow`}>
							<Image
								src={'/cloudy.png'}
								alt='cloudy'
								width={130}
								height={130}
								priority
							/>
						</div>

						<h1 className={styles.tempText}>{temp_f}°F</h1>
					</div>
					<div className={styles.conditionContainer}>
						<p className={styles.tempCondition}>{condition.text}</p>

						<p className={styles.windSpeed}>{windProfile()} winds</p>
					</div>
				</div>
			</div>
		</div>
	)
}
