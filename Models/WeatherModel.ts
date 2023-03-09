export default interface WeatherModel {
	current: {
		temp_c: number
		temp_f: number
		condition: {
			text: string
			icon: string
		}
		wind_mph: number
	}
	location: {
		name: string
		localtime: string
	}
}
