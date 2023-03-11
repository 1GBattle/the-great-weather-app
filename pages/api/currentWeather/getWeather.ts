import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function getWeather(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') {
		res.status(405).json({ message: 'Method not allowed' })
	}

	const { city, longitude, latitude } = req.query

	if (!city && !longitude && !latitude) {
		res.status(400).json({
			message: 'Bad request, please specify a city or latitude and longitude'
		})
	}

	if (city && !latitude && !longitude) {
		try {
			const response = await axios.get(
				`http://api.weatherapi.com/v1/current.json?key=66ebac34518041b0b4255555230303&q=${city}&aqi=no`
			)

			res.status(200).json(response.data)
		} catch (err: any) {
			res.status(500).json({ message: `Internal server error ${err}` })
		}
	}

	if (latitude && longitude && !city) {
		try {
			const response = await axios.get(
				`http://api.weatherapi.com/v1/current.json?key=66ebac34518041b0b4255555230303&q=${latitude},${longitude}&aqi=no`
			)

			res.status(200).json(response.data)
		} catch (err: any) {
			res.status(500).json({ message: `Internal server error ${err}` })
		}
	}
}
