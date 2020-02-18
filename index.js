global.settings = {
    "debug": false, // debug mode
    "MinimalMode": false, // disable modules and system information on start
    "warn": true, // warns mode
    "error": true // errors mode
};
global.cmd = require('./tools/console');
global.mongoose = require('mongoose');
mongoose.connect('mongodb://185.230.241.45/basebot', { useNewUrlParser: true, useUnifiedTopology: true});
global.DataBaseConnection = mongoose.connection; // connection to mongodb database. 

const fs = require('fs'); // require('fs');
require('./SysLoader')(fs); // load SystemModule

let BaseClient = require('./classes/BaseClient.js');  // require BaseClient
global.client = new BaseClient(); // create new global.client with BaseClient()

run(global.client); // run bot with global.client argument

async function run(client) { 
    client.login(global.config.client.token) // bot login
    require('./ModLoader')(client, fs); // load modules
};