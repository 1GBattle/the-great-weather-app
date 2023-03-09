import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import WeatherModel from '@/Models/WeatherModel'
import axios from 'axios'

export const getCurrentWeatherByCity = createAsyncThunk(
	'weather/getCurrentWeather',
	async (city: string, { rejectWithValue }) => {
		try {
			const response = await axios.get('/api/currentWeather/getWeather?city=' + city)
			return response.data
		} catch (err: any) {
			return rejectWithValue(err.response.data)
		}
	}
)

export const getWeatherForecast = createAsyncThunk(
	'weather/getWeatherForecast',
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
		forecast: [] as WeatherModel[]
	},
	reducers: {
		setCurrentWeather(state, action) {
			state.currentWeather = action.payload
		},
		setForecast(state, action) {
			state.forecast.push(action.payload)
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getCurrentWeatherByCity.fulfilled, (state, action) => {
			state.currentWeather = action.payload
		})

		builder.addCase(getWeatherForecast.fulfilled, (state, action) => {
			state.forecast = action.payload
		})
	}
})

export const { setCurrentWeather, setForecast } = weatherSlice.actions
export default weatherSlice.reducer
