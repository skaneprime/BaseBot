const fs = require('fs');
global.config = {};
if(!fs.existsSync('./configuration/client.json')) { // if client.json is not exist
    console.log(`\x1b[31m[ОШИБКА] \x1b[37mclient.json not found!`); // console.log(error);
    console.log(`\x1b[31mEMERGENCY STOP!\x1b[37m`) // console.log(err);
    process.exit(); // stop bot
}
fs.readdirSync('./configuration').forEach(InitConfig); // read config

function InitConfig(file) {
    global.config[file.split('.')[0]] = JSON.parse(fs.readFileSync(`./configuration/${file}`)); // set global.config[configname]
};