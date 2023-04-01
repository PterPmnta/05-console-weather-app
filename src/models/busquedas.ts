import axios from 'axios';
import fs from 'fs';
import capitalize from 'capitalize';
import * as dotenv from 'dotenv';
dotenv.config();

export class Busquedas {
    historial: Array<string> = [];
    dbPath = './src/db/historial.json';

    constructor() {
        this.readDB();
    }

    get paramsMapbox() {
        return {
            access_token: process.env.MAPBOX_KEY,
            limit: 5,
            language: 'es'
        };
    }

    get paramsWeatherAPI() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        };
    }

    get capitalizedHistory() {
        return this.historial.map((lugar) => {
            return capitalize.words(lugar);
        });
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

    async getWeatherByPlace(lat: number, lon: number) {
        try {
            const urlGeneratedToGetWeather = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsWeatherAPI, lat, lon }
            });

            const resp = await urlGeneratedToGetWeather.get('');
            const { weather, main } = resp.data;

            return {
                desc: weather[0].description || weather[1].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            };
        } catch (error) {
            console.error(error);
        }
    }

    addNewPlaceToTheHistory(lugar: string) {
        if (this.historial.includes(lugar.toLocaleLowerCase())) {
            return;
        }

        this.historial = this.historial.splice(0, 5);

        this.historial.unshift(lugar.toLocaleLowerCase());
        this.saveDB();
    }

    saveDB() {
        const payload = {
            historial: this.historial
        };
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    readDB() {
        if (!fs.existsSync(this.dbPath)) {
            return;
        }

        const data = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
        const dbInfo = JSON.parse(data);
        this.historial = dbInfo.historial;
    }
}
