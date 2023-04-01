import inquirer from 'inquirer';
import 'colorts/lib/string';
import {
    inquirerMenu,
    leerInput,
    pausarApp,
    placesList
} from './helpers/inquirer';
import { Busquedas } from './models/busquedas';

const main = async () => {
    let opt;

    const busquedas = new Busquedas();

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                const lugar = await leerInput('Ciudad:');
                const lugares = await busquedas.getCities(lugar);
                const placeIdReturned: any = await placesList(lugares);

                const placesChosen = lugares.find(
                    (lugar: any) => lugar.id === placeIdReturned
                );

                const weatherData = await busquedas.getWeatherByPlace(
                    placesChosen.lat,
                    placesChosen.lng
                );

                console.clear();

                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad: ', placesChosen.name);
                console.log('Lng: ', placesChosen.lng);
                console.log('Lat: ', placesChosen.lat);
                console.log('Desc: ', weatherData?.desc);
                console.log('Temperatura: ', weatherData?.temp);
                console.log('Temp. Min: ', weatherData?.min);
                console.log('Temp. Max: ', weatherData?.max);
                break;
        }

        if (opt !== 0) await pausarApp();
    } while (opt !== 0);
};

main();
