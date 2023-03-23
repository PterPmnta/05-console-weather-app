import axios from 'axios';

export class Busquedas {
    historial = ['Tegucigalpa', 'Madrid', 'San Jose', 'San Francisco'];

    constructor() {}

    async getCity(lugar: string) {
        try {
            const resp = await axios.get('https://reqres.in/api/users?page=2');
            console.log(resp.data);
            return [];
        } catch (error) {
            return [];
        }
    }
}
