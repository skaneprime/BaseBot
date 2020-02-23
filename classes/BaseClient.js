const SuperStorage = require('./SuperStorage');
const { Client } = require('discord.js');
module.exports = class BaseClient extends Client {
    constructor() {
        super(global.config.client); // setting client
        
        this.disableEveryone = global.config.client.disableEveryone;
        this.prefix = global.config.client.prefix; // create client.prefix

        this.commands = new SuperStorage(); // create new SuperStorage for commands
        this.cooldowns = {}; // create new object for cooldown, client.cooldowns
    };

    loadCommand(name, category) {
        try {
            if(category) {
                const cmdClass = require(`./../commands/${category}/${name}.js`);
                this.commands.set(name, new cmdClass());
            } else {
                const cmdClass = require(`./../commands/${name}.js`); 
                this.commands.set(name, new cmdClass()); // push cmdClass in client.commands
            }
        } catch (error) { 
            console.log(error) // on error
        }
    };
};