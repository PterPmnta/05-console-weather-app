import inquirer from 'inquirer';
import { inquirerMenu, pausarApp } from './helpers/inquirer';

const main = async () => {
    let opt;

    do {
        opt = await inquirerMenu();
        console.log({ opt });

        if (opt !== 0) await pausarApp();
    } while (opt !== 0);
};

main();
