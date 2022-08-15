import fs from 'fs';

const path = './db/database.json'

export const saveDB = ( locations = [] ) => {
    const payload = {
        history: locations
    };

    fs.writeFileSync( path, JSON.stringify( payload ) );
}

export const readDB = () => {

    if( !fs.existsSync( path ) ) return null;

    const dbData = fs.readFileSync( path, { encoding: 'utf-8' });
    const { history } = JSON.parse( dbData );
    
    return history;
}