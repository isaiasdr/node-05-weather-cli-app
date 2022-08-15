import axios from "axios";

const token = process.env.MAPBOX_API_KEY || '';

export const mapboxApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        limit: 5,
        language: 'es',
        access_token: token
    }
})