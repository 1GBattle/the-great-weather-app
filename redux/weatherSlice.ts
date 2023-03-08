import { createSlice } from '@reduxjs/toolkit'

const weatherSlice = createSlice({
	name: 'weather',
	initialState: {
		currentWeather: {
			current: {
				temp_c: 0,
				temp_f: 0,
				condition: {
					text: '',
					icon: ''
				},
				wind_mph: 0
			},
			location: {
				name: '',
				localtime: ''
			}
		},
		forecast: {}
	},
	reducers: {
		setCurrentWeather(state, action) {
			state.currentWeather = action.payload
		},
		setForecast(state, action) {
			state.forecast = action.payload
		}
	}
})

export const { setCurrentWeather, setForecast } = weatherSlice.actions
export default weatherSlice.reducer
