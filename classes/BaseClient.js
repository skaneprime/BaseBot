const SuperStorage = require('./SuperStorage'); // We will need SuperStorage (which extends Collection Which extends Map) for storing commands
const { Client } = require('discord.js'); // To create our Custom Client Class we should extend original Client from discord.js
module.exports = class BaseClient extends Client {
    constructor() {
        super(config.client); // Super is for data which requires Client. Config is a global value so we can use it anywhere we want.
        
        this.prefix = config.client.prefix; // Client's Setting Standard prefix,

        this.commands = new SuperStorage(); // Creating a new SuperStorage for storing commands.
        this.cooldowns = {}; // Object for storing guild's user's cooldown on command
    };

    loadCommand(name, category) { // With this function we can load commands 
        try {
            if(category) {
                const cmdClass = require(`./../commands/${category}/${name}.js`); // requiring our command which has category
                this.commands.set(name, new cmdClass()); // setting it to client.commands
            } else {
                const cmdClass = require(`./../commands/${name}.js`); // requiring our command which does not have any category
                this.commands.set(name, new cmdClass()); // setting it to client.commands
            }
        } catch (error) { 
            console.log(error) // if we catch error we log it to console
        }
    };
};