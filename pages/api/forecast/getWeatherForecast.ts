import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function getWeatherForecast(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET') {
		res.status(405).json({ message: 'Method not allowed' })
	}

	const { city, latitude, longitude } = req.query

	if (city && !latitude && !longitude) {
		try {
			const response = await axios.get(
				`http://api.weatherapi.com/v1/forecast.json?key=66ebac34518041b0b4255555230303&q=${city}&days=8&aqi=no`
			)

			res.status(200).json(response.data.forecast.forecastday)
		} catch (err: any) {
			res.status(500).json({ statusCode: 500, message: err.message })
		}
	}

	if (longitude && latitude && !city) {
		try {
			const response = await axios.get(
				`http://api.weatherapi.com/v1/forecast.json?key=66ebac34518041b0b4255555230303&q=${latitude},${longitude}&days=8&aqi=no`
			)

			res.status(200).json(response.data.forecast.forecastday)
		} catch (err: any) {
			res.status(500).json({ statusCode: 500, message: err.message })
		}
	}
}
