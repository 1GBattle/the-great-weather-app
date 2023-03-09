import { useAppSelector } from '@/redux/hooks'
import Image from 'next/image'
import styles from '@/styles/ForecastList.module.css'
import ForecastCard from './ForecastCard'
import ForecastModel from '@/Models/ForecastModel'

export default function ForecastList() {
	const [forecast] = useAppSelector((state) => state.weather.forecast)
	return (
		<div className='flex-center'>
			<div className={styles.forecastListContainer}>
				{forecast &&
					forecast.map((day) => (
						<ForecastCard key={day.date} icon={'http:' + day.day.condition.icon} />
					))}
			</div>
		</div>
	)
}
