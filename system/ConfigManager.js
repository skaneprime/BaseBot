const fs = require('fs');
global.config = undefined;
let configs = [
    {
        name: 'client',
        data: {
            "DisableEveryone": true,
            "token": "TOKEN_HERE",
            "prefix": "PREFIX_HERE"
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
]; // массив с основными конфигами

if(!isConfFolderExist()) { // если нету папку с конфигами 
    createConfFolder(); // создаем папку с конфигами
    createConfig(); // создаём конфиги
} else { 
    global.config = {}; // создаем глобальную переменную config
    fs.readdirSync('./configuration').forEach(InitConfig); // читаем конфиг
};

function InitConfig(file) {
    global.cmd.sys(require('chalk').red.bold('[СonfigManager]'), `Loading ${require('chalk').bold.yellow.italic(file)}!`); // пишем в консоль логи
    global.config[file.split('.')[0]] = JSON.parse(fs.readFileSync(`./configuration/${file}`)); // инициализируем конфиг
};

// Ниже даже не спускайтесь там страшно!
function isConfFolderExist() {
    if(!fs.existsSync('./configuration')) 
        return false;
    else return true;
};

function createConfFolder() {
    console.log(require('chalk').red.bold('[СonfigManager]'), 'Creating Configuration Folder');
    fs.mkdir('./configuration', err => {
        if(err) reject(err)
        else resolve(true)
    });
};

function createConfig() {
    configs.forEach(config => {
        if(!fs.existsSync(`./configurations/${config.name}`)) {   
            console.log(require('chalk').red.bold('[СonfigManager]'), `${config.name}.json created! Please set up it!`);
            fs.writeFileSync(`./configuration/${config.name}.json`, `${JSON.stringify(config.data, null, "\t")}`);
        };
    });
    process.exit();
};