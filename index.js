global.cmd = require('./tools/console');

global.settings = {
    "debug": false, // enable debug mode
    "warn": true, // enable warns
    "error": true // enable errors
}

const fs = require('fs'); // require('fs');
require('./SysLoader')(fs); // load SystemModule

let BaseClient = require('./classes/BaseClient.js');  // require BaseClient
global.client = new BaseClient(); // create new global.client with BaseClient()

run(global.client); // run bot with global.client argument

async function run(client) { 
    client.login(global.config.client.token) // bot login
    require('./ModLoader')(client, fs); // load modules
};