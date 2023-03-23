import inquirer from 'inquirer';
import 'colorts/lib/string';
import { inquirerMenu, leerInput, pausarApp } from './helpers/inquirer';
import { Busquedas } from './models/busquedas';

const main = async () => {
    let opt;

    const busquedas = new Busquedas();

    do {
        opt = await inquirerMenu();
        console.log({ opt });

        switch (opt) {
            case 1:
                const lugar = await leerInput('Ciudad:');
                await busquedas.getCity(lugar);

                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad: ');
                console.log('Lng: ');
                console.log('Lat: ');
                console.log('Temperatura: ');
                console.log('Temp. Min: ');
                console.log('Temp. Max: ');
                break;
        }

        if (opt !== 0) await pausarApp();
    } while (opt !== 0);
};

main();
