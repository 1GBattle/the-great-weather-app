import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function getWeatherForecast(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET') {
		res.status(405).json({ message: 'Method not allowed' })
	}

	try {
		const { city } = req.query

		const response = await axios.get(
			`http://api.weatherapi.com/v1/forecast.json?key=66ebac34518041b0b4255555230303&q=${city}&days=7&aqi=no`
		)

		console.log('response.data', response.data)
		res.status(200).json(response.data)
	} catch (err: any) {
		res.status(500).json({ statusCode: 500, message: err.message })
	}
}
