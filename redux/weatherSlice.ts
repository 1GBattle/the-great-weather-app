import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import WeatherModel from '@/Models/WeatherModel'
import axios from 'axios'
import ForecastModel from '@/Models/ForecastModel'

export const setCurrentWeatherByCity = createAsyncThunk(
	'weather/setCurrentWeatherByCity',
	async (city: string | null, { rejectWithValue }) => {
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

export const setCurrentWeatherByGeoLocation = createAsyncThunk(
	'weather/setCurrentWeatherByGeoLocation',
	async (
		geoLocation: { latitude: number; longitude: number },
		{ rejectWithValue }
	) => {
		try {
			const response = await axios.get(
				`/api/currentWeather/getWeather?latitude=${geoLocation.latitude}&longitude=${geoLocation.longitude}`
			)
			console.log('response data', response.data)
			return response.data
		} catch (err: any) {
			return rejectWithValue(err.response.data)
		}
	}
)

export const setWeatherForecastByGeoLocation = createAsyncThunk(
	'weather/setWeatherForecastByGeoLocation',
	async (
		geoLocation: { latitude: number; longitude: number },
		{ rejectWithValue }
	) => {
		try {
			const response = await axios.get(
				`/api/forecast/getWeatherForecast?latitude=${geoLocation.latitude}&longitude=${geoLocation.longitude}`
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
		forecast: [] as ForecastModel[][],
		geoLocation: {
			latitude: 0,
			longitude: 0
		}
	},
	reducers: {
		setCurrentWeather(state, action) {
			state.currentWeather = action.payload
		},
		setForecast(state, action) {
			state.forecast.push(action.payload.forecast.forecastday)
		},
		setLocation(state, action) {
			state.geoLocation = action.payload
		}
	},
	extraReducers: (builder) => {
		builder.addCase(setCurrentWeatherByCity.fulfilled, (state, action) => {
			state.currentWeather = action.payload
		})

		builder.addCase(setWeatherForecastByCity.fulfilled, (state, action) => {
			state.forecast = []
			state.forecast.push(action.payload)
		})

		builder.addCase(setCurrentWeatherByGeoLocation.fulfilled, (state, action) => {
			state.currentWeather = action.payload
		})

		builder.addCase(setWeatherForecastByGeoLocation.fulfilled, (state, action) => {
			state.forecast = []
			state.forecast.push(action.payload)
		})
	}
})

export const { setCurrentWeather, setForecast, setLocation } = weatherSlice.actions
export default weatherSlice.reducer
