import axios from 'axios'
import styles from '@/styles/Home.module.css'
import CurrentTempCard from '@/Components/CurrentTempCard'
import SearchBar from '@/Components/SearchBar'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
	setCurrentWeather,
	setCurrentWeatherByGeoLocation,
	setForecast,
	setLocation,
	setWeatherForecastByGeoLocation
} from '@/redux/weatherSlice'
import ForecastList from '@/Components/forecast/ForeCastList'
import getWeather from './api/currentWeather/getWeather'

export async function getServerSideProps() {
	const currentWeather = await axios.get(
		`http://api.weatherapi.com/v1/current.json?key=66ebac34518041b0b4255555230303&q=New York&aqi=no`
	)

	const forecast = await axios.get(
		`http://api.weatherapi.com/v1/forecast.json?key=66ebac34518041b0b4255555230303&q=New York&days=8&aqi=no&alerts=no`
	)

	return {
		props: {
			currentWeatherData: currentWeather.data,
			forecastData: forecast.data
		}
	}
}

interface PageProps {
	currentWeatherData: any
	forecastData: any
}

export default function Page({ currentWeatherData, forecastData }: PageProps) {
	const dispatch = useAppDispatch()
	const { latitude, longitude } = useAppSelector(
		(state) => state.weather.geoLocation
	)

	const getLocation = () => {
		if (navigator.geolocation) {
			return navigator.geolocation.getCurrentPosition((position) => {
				const { latitude, longitude } = position.coords
				dispatch(setLocation({ latitude, longitude }))
			})
		} else {
			console.log('Geolocation is not supported by this browser.')
		}
	}
	//runs when the component mounts
	useEffect(() => {
		dispatch(setCurrentWeather(currentWeatherData))
		dispatch(setForecast(forecastData))

		getLocation()
	}, [])

	useEffect(() => {
		if (latitude && longitude) {
			dispatch(setCurrentWeatherByGeoLocation({ latitude, longitude }))
			// dispatch(setWeatherForecastByGeoLocation({ latitude, longitude }))
		}
	}, [latitude, longitude])

	return (
		<div className={`${styles.lightBackground} page-container`}>
			<SearchBar />
			<CurrentTempCard />
			<ForecastList />
		</div>
	)
}
