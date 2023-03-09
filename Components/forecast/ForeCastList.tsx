import { useAppSelector } from '@/redux/hooks'
import Image from 'next/image'
import styles from '@/styles/ForecastList.module.css'
import ForecastCard from './ForecastCard'

export default function ForecastList() {
	const forecast = useAppSelector((state) => state.weather.forecast)

	return (
		<div className='flex-center'>
			<div className={styles.forecastListContainer}>
				<ForecastCard />
				<ForecastCard />
				<ForecastCard />
				<ForecastCard />
				<ForecastCard />
				<ForecastCard />
				<ForecastCard />
				<ForecastCard />
			</div>
		</div>
	)
}
