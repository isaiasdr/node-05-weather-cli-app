import axios from "axios";

const api_key = process.env.OPEN_WEATHER_MAP_API_KEY || '';

export const openWeatherMapApi = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/weather',
    params: {
        appid: api_key,
        units: 'metric',
        lang: 'es'
    }
});