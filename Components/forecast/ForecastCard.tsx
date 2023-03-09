import { useAppSelector } from '@/redux/hooks'
import styles from '@/styles/ForecastCard.module.css'
import Image from 'next/image'

export default function ForecastCard() {
	const forecast = useAppSelector((state) => state.weather.forecast)[0]

	return (
		<div className={styles.wrapper}>
			<div className={`${styles.cardContainer}`}>
				<div className={`${styles.cardContent} flex-column`}>
					<div className='flex-column'>
						<div className={styles.cityContent}></div>

						<div className={`${styles.weatherImg}`}>
							<Image
								src={'/cloudy.png'}
								alt='cloudy'
								width={40}
								height={40}
								priority
							/>
						</div>
					</div>
					<div className={styles.conditionContainer}></div>
				</div>
			</div>
		</div>
	)
}
