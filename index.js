const fs = require('fs'); // require('fs');
require('./SysLoader')(fs); // load systemmodule
let BaseClient = require('./classes/BaseClient.js');  // require BaseClient
global.client = new BaseClient(); // create new global.client with BaseClient()
run(global.client); // run bot with global.client argument

async function run(client) { 
    client.login(global.config.client.token) // bot login
    require('./ModLoader')(client, fs); // load modules
};

/* 
todo:  2) Вернуть категории 3) Динамичный Хелп
*/