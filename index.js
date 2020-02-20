global.settings = {
    "MinimalMode": false, // disable modules and system information on start
    "debug": 0, // debug mode
    "warn": 0, // warns mode
    "error": 0 // errors mode
};
global.memoryUsage = function() {
    const used = process.memoryUsage();
    for (let key in used) {
        cmd.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
    };
};
global.chalk = require('chalk'); // require chalk  and set it as a global
global.fs = require('fs'); // require fs and set it as a global
require('./SysLoader')(fs); // load SystemModule

let BaseClient = require('./classes/BaseClient.js');  // require BaseClient
global.client = new BaseClient(); // create new global.client with BaseClient()

run(global.client); // run bot with global.client argument

async function run(client) { 
    client.login(global.config.client.token) // bot login
    require('./ModLoader')(client, fs); // load modules
};