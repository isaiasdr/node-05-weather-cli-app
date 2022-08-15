import 'colors';
import 'dotenv/config';
import { readDB } from './helpers/db.js';


import { inquirerMenu, listLocations, pause, readInput } from './helpers/inquirer.js';
import { Searchs } from './models/Searchs.js';

const main = async () => {

    let opt;
    const searchs = new Searchs();

    do {
        
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                const search = await readInput('Location:');
                //search location
                const locations = await searchs.city( search );

                //select location
                const id = await listLocations( locations );

                if ( id === 0 ) continue;

                const locationSelected = locations.find( location => location.id === id );
                searchs.addHistory( locationSelected.name );
                //weather
                const weather = await searchs.getWeatherLocation( locationSelected.lat, locationSelected.lng );
                
                //show results
                console.clear();
                console.log('\nCity information\n'.green);
                console.log('City:', locationSelected.name);
                console.log('Lat:', locationSelected.lat);
                console.log('Lng:', locationSelected.lng);
                console.log('Temperature:', weather.temperature);
                console.log('Minimal:', weather.min);
                console.log('Maximum:', weather.max);
                console.log('How is the weather?:', weather.description);
                break;

            case 2:
                searchs.capitalizeHistory.forEach( ( location, index ) => {
                    const idx = `${ index + 1 }.`.green;
                    console.log(`${idx} ${ location.name }`);
                });
                break;
        
            default:
                break;
        }

        searchs.saveDB();

        if ( opt  !== 0 ) await pause();

    } while ( opt !== 0 );

}

main();