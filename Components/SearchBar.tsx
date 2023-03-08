import React, { Dispatch, SetStateAction } from 'react'
import styles from '@/styles/SearchBar.module.css'

interface Props {
	cityQuery: string
	setCityQuery: Dispatch<SetStateAction<string>>
}

export default function SearchBar({ cityQuery, setCityQuery }: Props) {
	return (
		<div className={`${styles.inputContainer} flex-center`}>
			<input
				value={cityQuery}
				onChange={(e) => setCityQuery(e.target.value)}
				className={styles.cityInput}
				type='text'
				placeholder='Search for a city'
			/>
		</div>
	)
}
