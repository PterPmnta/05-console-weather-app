import axios from 'axios';

export class Busquedas {
    historial = ['Tegucigalpa', 'Madrid', 'San Jose', 'San Francisco'];

    constructor() {}

    get paramsMapbox() {
        return {
            access_token:
                'pk.eyJ1IjoicHRlcnBtbnRhbSIsImEiOiJjbGZzeDE2Y3kwMnMwM2VvbW56OGZzZmpzIn0.6FBPGyvkrOezVvm4xclDjg',
            limit: 5,
            language: 'es'
        };
    }

    async getCity(lugar: string) {
        try {
            const urlGeneratedToGetPlaces = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?proximity=ip&types=place%2Cpostcode%2Caddress`,
                params: this.paramsMapbox
            });

            const resp = await urlGeneratedToGetPlaces.get('');
            console.log(resp.data);
            return [];
        } catch (error) {
            return [];
        }
    }
}
