const fs = require('fs');
global.config = {};
fs.readdirSync('./configuration').forEach(InitConfig);

function InitConfig(file) {
    global.config[file.split('.')[0]] = JSON.parse(fs.readFileSync(`./configuration/${file}`));
};