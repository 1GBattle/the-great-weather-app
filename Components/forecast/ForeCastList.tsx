import { useAppSelector } from '@/redux/hooks'
import styles from '@/styles/ForecastList.module.css'
import ForecastCard from './ForecastCard'

export default function ForecastList() {
	let [forecast] = useAppSelector((state) => state.weather.forecast)
	return (
		<div className='flex-center'>
			<div className={styles.forecastListContainer}>
				{forecast &&
					forecast.map((forecast) => (
						<ForecastCard
							key={forecast.date}
							icon={'http:' + forecast.day.condition.icon}
							forecast={forecast}
						/>
					))}
			</div>
		</div>
	)
}
