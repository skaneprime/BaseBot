const SuperStorage = require('./SuperStorage'); // We will need SuperStorage (which extends Collection Which extends Map) for storing commands
const { Client } = require('discord.js'); // To create our customs Client Class we should extend original Client from discord.js
module.exports = class BaseClient extends Client {
    constructor() {
        super(config.client); // Super is for data which requires Client. Config is a global value so we can use it where we want.
        
        this.prefix = config.client.prefix; // Setting Client's Standard prefix,

        this.commands = new SuperStorage(); // Creating a new SuperStorage for storing commands.
        this.cooldowns = {}; // Object for storing guild's user's cooldown on command
    };

    loadCommand(name, category) { // With this function we can
        try {
            if(category) {
                const cmdClass = require(`./../commands/${category}/${name}.js`);
                this.commands.set(name, new cmdClass());
            } else {
                const cmdClass = require(`./../commands/${name}.js`); 
                this.commands.set(name, new cmdClass()); // set cmdClass in client.commands
            }
        } catch (error) { 
            console.log(error) // on error
        }
    };
    loadDBCommand(name) {
        try {
            const cmdClass = db.commands.find({'name': name});
            console.log(cmdClass);
        } catch (error) {
            console.log(error)
        }
    }
};