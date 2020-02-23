const { readdirSync, readFileSync, existsSync, mkdir, writeFileSync } = require('fs');
const { question } = require('readline-sync');
let configs = [
    {
        name: 'client',
        data: {
            "DisableEveryone": true,
            "token": "TOKEN_HERE",
            "prefix": "!",
            "statusOnStart": true,
            "status": `!help`
        }
    },
    {
        name: 'database',
        data: {
            "url": "mongodb://localhost/db",
            "options": { 
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        }
    }
]; // Array with base configs
let cfText = (key) => {
    let c = {
        DisableEveryone: `[${chalk.yellow.bold(key)}] ${chalk.green.bold(`(Boolean)`)}: `,
        token: `\n${chalk.gray(`You can get it from [https://discordapp.com/developers/applications/]`)}\nPlease input [${chalk.yellow.bold(key)}] of your bot! ${chalk.green.bold(`(String)`)}: `,
        prefix: `\nInput [${chalk.yellow.bold(key)}] of your bot! ${chalk.green.bold(`(String)`)}: `,
        statusOnStart: `[${chalk.yellow.bold(key)}] Enables presence activity ${chalk.green.bold(`(Boolean)`)}: `,
        status: `[${chalk.yellow.bold(key)}] Presence text of your bot ${chalk.green.bold(`(String)`)}: `,
        url: `[${chalk.yellow.bold(key)}] of your MongoDB ${chalk.green.bold(`(String)`)}: `,
        options: `[${chalk.yellow.bold(key)}] options of DB. You can leave it empty ${chalk.green.bold(`(JSON)`)}: `
    };
    return c[key];
};
if(!isConfFolderExist()) { // If there's no config folder 
    createConfFolder(); // создаем папку с конфигами
    createConfig(); // создаём конфиги
};

global.config = {}; // creating global var config
readdirSync('./configuration').forEach(InitConfig); // Init config


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
    console.log(require('chalk').red.bold('[СonfigManager]'), 'Creating Configuration');
    mkdir('./configuration', err => {
        if(err) return err;
        else return;
    });
};

function createConfig() {
    configs.forEach(config => {
        Object.keys(config.data).forEach(key => {
            let input = question(cfText(key));
            if(['DisableEveryone', 'statusOnStart'].includes(key)) {
                input = (input === 'true');
            };
            if (key === 'options') {
                try {
                    input = JSON.parse(input);
                } catch {
                    input = {
                        useNewUrlParser: true,
                        useUnifiedTopology: true
                    };
                };
            };
            config.data[key] = input || config.data[key];
        });
        writeFileSync(`./configuration/${config.name}.json`, `${JSON.stringify(config.data, null, "\t")}`);
    });
};