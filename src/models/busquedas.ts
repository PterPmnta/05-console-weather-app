import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

export class Busquedas {
    historial = ['Tegucigalpa', 'Madrid', 'San Jose', 'San Francisco'];

    constructor() {}

    get paramsMapbox() {
        return {
            access_token: process.env.MAPBOX_KEY,
            limit: 5,
            language: 'es'
        };
    }

    async getCities(lugar: string) {
        try {
            const urlGeneratedToGetPlaces = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?proximity=ip&types=place%2Cpostcode%2Caddress`,
                params: this.paramsMapbox
            });

            const resp = await urlGeneratedToGetPlaces.get('');
            return resp.data.features.map((city: any) => {
                return {
                    id: city.id,
                    name: city.place_name,
                    lng: city.center[0],
                    lat: city.center[1]
                };
            });
        } catch (error) {
            return [];
        }
    }
}
