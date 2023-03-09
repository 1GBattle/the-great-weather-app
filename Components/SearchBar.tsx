import styles from '@/styles/SearchBar.module.css'
import { useAppDispatch } from '@/redux/hooks'
import { useState } from 'react'
import { getCurrentWeatherByCity } from '@/redux/weatherSlice'
import axios from 'axios'

export default function SearchBar() {
	const dispatch = useAppDispatch()
	const [searchQuery, setSearchQuery] = useState('')

	const handleSearch = () => {
		dispatch(getCurrentWeatherByCity(searchQuery))
	}

	return (
		<div className={`${styles.inputContainer} flex-center`}>
			<input
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				onKeyUp={(e) => {
					if (e.key === 'Enter') {
						handleSearch()
					}
				}}
				className={styles.cityInput}
				type='text'
				placeholder='Search for a city'
			/>
		</div>
	)
}
