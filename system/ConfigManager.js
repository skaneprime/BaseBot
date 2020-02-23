const { readdirSync, readFileSync, existsSync, mkdir, writeFileSync } = require('fs');
const { createInterface } = require('readline');
global.config = undefined;
let configs = [
    {
        name: 'client',
        data: {
            "DisableEveryone": true,
            "token": "TOKEN_HERE",
            "prefix": "PREFIX_HERE",
            "statusOnStart": true,
            "status": `#help`
        }
    },
    {
        name: 'database',
        data: {
            "url": "mongodb://ip/db",
            "options": { 
            }
        }
    },
    {
        name: 'main',
        data: {}
    },
    {
        name: 'colors',
        data: {}
    },
]; // Array with base configs

if(!isConfFolderExist()) { // If there's no config folder 
    createConfFolder(); // создаем папку с конфигами
    createConfig(); // создаём конфиги
} else { 
    global.config = {}; // creating global var config
    readdirSync('./configuration').forEach(InitConfig); // Init config
};

function InitConfig(file) {
    global.cmd.sys(require('chalk').red.bold('[СonfigManager]'), `Loading ${require('chalk').bold.yellow.italic(file)}!`); // пишем в консоль логи
    global.config[file.split('.')[0]] = JSON.parse(readFileSync(`./configuration/${file}`)); // инициализируем конфиг
};

// Main Funcs if config not exist
function isConfFolderExist() {
    if(!existsSync('./configuration')) 
        return false;
    else return true;
};

function createConfFolder() {
    console.log(require('chalk').red.bold('[СonfigManager]'), 'Creating Configuration Folder');
    mkdir('./configuration', err => {
        if(err) reject(err)
        else resolve(true)
    });
};

function createConfig() {
    configs.forEach(config => {
        if (!existsSync(`./configurations/${config.name}`)) {
            if (!settings.MinimalMode)
                console.log(require('chalk').red.bold('[СonfigManager]'), `${config.name}.json created! Please set up it!`);
            writeFileSync(`./configuration/${config.name}.json`, `${JSON.stringify(config.data, null, "\t")}`);
        }
        ;
    });
    process.exit();
    // fillConfig();
};

function fillConfig() {
    let rl = createInterface();
    rl.question(chalk.cyan('Please Insert Token of your bot!: '), () => {

    });
};