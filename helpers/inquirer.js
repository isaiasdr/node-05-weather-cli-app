import inquirer from 'inquirer';
import 'colors';

const questions = [
    {
        type: 'list',
        name: 'opcion',
        message: 'What want to do?',
        choices: [
            {
                value: 1,
                name: `${ '1.'.blue } Search location`
            },
            {
                value: 2,
                name: `${ '2.'.blue } History`
            },
            {
                value: 0,
                name: `${ '0.'.blue } Exit`
            }
        ],
    }
];

export const inquirerMenu = async () => {
    
    console.clear();
    console.log('========================='.green);
    console.log('     Select a option     '.white);
    console.log('=========================\n'.green);

    const { opcion } = await inquirer.prompt( questions );
    return opcion;
};

export const pause = async() => {

    const test = await inquirer.prompt([
        {
            type: 'input',
            name: 'enter',
            message: `Select ${ 'ENTER'.green } to continue`,
        }
    ]);
};

export const readInput = async( message ) => {
    const question = [
        {
            type: 'input',
            name: 'description',
            message,
            validate: ( value ) => {
                if ( value.length === 0 )
                    return 'Please enter a description';
                
                return true;
            }
        }
    ];

    const { description } = await inquirer.prompt( question );
    return description;
};

export const listLocations = async ( locations = [] ) => {

    const choices = locations.map( (location, index) => {

        const idx = `${ index + 1 }.`.blue;

        return {
            value: location.id,
            name: `${ idx } ${ location.name }`
        };
    });

    choices.unshift({
        value: 0,
        name: '0.'.blue + ' Cancel'
    });

    const question = [
        {
            type: 'list',
            name: 'id',
            message: `Select Location to ${ 'Select'.green }`,
            choices
        }
    ];

    const { id } = await inquirer.prompt( question );
    return id;
};

export const confirmDelete = async ( message ) => {

    const question = [
        {
            type: "confirm",
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt( question );
    return ok;
};

export const showListChecklist = async ( tasks = [] ) => {

    const choices = tasks.map( (task, index) => {

        const idx = `${ index + 1 }.`.blue;

        return {
            value: task.id,
            name: `${ idx } ${ task.description }`,
            checked: task.completedDate ? true : false
        };
    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: `Select`,
            choices
        }
    ];

    const { ids } = await inquirer.prompt( question );
    return ids;
}