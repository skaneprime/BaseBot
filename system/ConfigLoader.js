const fs = require('fs');
global.config = {};
if(!fs.existsSync('./configuration/client.json')) {
    console.log(`\x1b[31m[ОШИБКА] \x1b[37mНе найден client.json!`);
    console.log(`\x1b[31mАВАРИЙНАЯ ОСТАНОВКА БОТА!\x1b[37m`)
    process.exit();
}
fs.readdirSync('./configuration').forEach(InitConfig);

function InitConfig(file) {
    global.config[file.split('.')[0]] = JSON.parse(fs.readFileSync(`./configuration/${file}`));
};