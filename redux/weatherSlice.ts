import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import WeatherModel from '@/Models/WeatherModel'
import axios from 'axios'
import ForecastModel from '@/Models/ForecastModel'

export const setCurrentWeatherByCity = createAsyncThunk(
	'weather/setCurrentWeatherByCity',
	async (city: string, { rejectWithValue }) => {
		try {
			const response = await axios.get('/api/currentWeather/getWeather?city=' + city)
			return response.data
		} catch (err: any) {
			return rejectWithValue(err.response.data)
		}
	}
)

export const setWeatherForecastByCity = createAsyncThunk(
	'weather/setWeatherForecast',
	async (city: string, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				'/api/forecast/getWeatherForecast?city=' + city
			)
			return response.data
		} catch (err: any) {
			return rejectWithValue(err.response.data)
		}
	}
)

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
		} satisfies WeatherModel,
		forecast: [] as ForecastModel[][]
	},
	reducers: {
		setCurrentWeather(state, action) {
			state.currentWeather = action.payload
		},
		setForecast(state, action) {
			state.forecast.push(action.payload.forecast.forecastday)
		}
	},
	extraReducers: (builder) => {
		builder.addCase(setCurrentWeatherByCity.fulfilled, (state, action) => {
			state.currentWeather = action.payload
		})

		builder.addCase(setWeatherForecastByCity.fulfilled, (state, action) => {
			state.forecast.push(action.payload.forecast.forecastday)
		})
	}
})

export const { setCurrentWeather, setForecast } = weatherSlice.actions
export default weatherSlice.reducer
