export default interface ForecastModel {
	astro: {
		sunrise: string
		sunset: string
		is_sun_up: number
	}
	date: string
	day: {
		avgtemp_c: number
		avgtemp_f: number
		condition: {
			code: number
			icon: string
			text: string
		}
		maxtemp_c: number
		maxtemp_f: number
		mintemp_c: number
		mintemp_f: number
		totalprecip_in: number
		totalprecip_mm: number
		uv: number
		daily_chance_of_rain: string
	}
}
