import axios from 'axios'
import styles from '@/styles/Home.module.css'
import CurrentTempCard from '@/Components/CurrentTempCard'
import SearchBar from '@/Components/SearchBar'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setCurrentWeather } from '@/redux/weatherSlice'

export async function getServerSideProps() {
	const response = await axios.get(
		`http://api.weatherapi.com/v1/current.json?key=66ebac34518041b0b4255555230303&q=New York&aqi=no`
	)

	return {
		props: {
			weatherData: response.data
		}
	}
}

interface PageProps {
	weatherData: any
}

export default function Page({ weatherData }: PageProps) {
	const [cityQuery, setCityQuery] = useState<string>('New York')
	const dispatch = useAppDispatch()
	const getWeather = async (city: string) => {
		const response = await axios.get(
			'/api/currentWeather/getWeather?city=' + cityQuery
		)

		return response.data
	}

	//runs when the component mounts
	useEffect(() => {
		dispatch(setCurrentWeather(weatherData))
	}, [])

	return (
		<div className={`${styles.lightBackground} page-container`}>
			<SearchBar cityQuery={cityQuery} setCityQuery={setCityQuery} />
			<CurrentTempCard />
		</div>
	)
}
