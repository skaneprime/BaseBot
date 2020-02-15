const fs = require('fs');
require('./SysLoader')(fs);
let BaseClient = require('./classes/BaseClient.js');
global.client = new BaseClient();
run(global.client);

async function run(client) {
    client.login(global.config.client.token)
    require('./ModLoader')(client, fs);
};

/* 
todo: 1) Cooldown 2) Вернуть категории 3) Динамичный Хелп
*/