import { readDB, saveDB } from "../helpers/db.js";
import { mapboxApi } from "../helpers/mapboxApi.js";
import { openWeatherMapApi } from "../helpers/openWeatherMapApi.js";



export class Searchs {
    history = [];

    constructor() {
        const locations = readDB();

        if ( !!locations )
            this.history = [...locations];
    }

    get capitalizeHistory() {
        return this.history.map( location => {

            const arrayWords = location.split(' ');
            const arrayCapitalizedWords = arrayWords.map( word => word[0].toUpperCase() + word.substring(1) );

            return {
                ...location,
                name: arrayCapitalizedWords.join(' ')
            }
        })
    }

    async city( location = '' ) {
        try {
            //request http
            const res = await mapboxApi.get(`${ location }.json`);
            
            return res.data.features.map( location => ({
                id: location.id,
                name: location.place_name,
                lng: location.center[0],
                lat: location.center[1]
            }));
            
        } catch (error) {
            console.log( error );
            return [];
        }
    }

    async getWeatherLocation( lat, lon ) {

        try {
            const res = await openWeatherMapApi.get('', { params: { lat, lon } });

            const { weather, main } = res.data;

            return {
                description: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temperature: main.temp
            };

        } catch (error) {
            console.log( error );
        }
    }

    addHistory( location = '' ) {

        if ( this.history.includes( location.toLowerCase() ) ) return;

        this.history = this.history.splice(0,5);

        this.history.unshift( location.toLowerCase() );

    }

    saveDB() {
        const locations = this.history;

        saveDB( locations );
    }
}