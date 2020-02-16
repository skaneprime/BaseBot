const { Client, Collection } = require('discord.js');
module.exports = class BaseClient extends Client {
    constructor() {
        super(global.config.client); // setting client

        this.prefix = global.config.client.prefix; // create client.prefix

        this.commands = new Collection(); // create new collection for commands
        this.cooldowns = {}; // create new object for cooldown, client.cooldowns
    };

    loadCommand(name, dir) {
        try {
            const cmdClass = require(`./../commands/${dir}/${name}.js`); // create new cmdclass
            this.commands.set(name, new cmdClass); // push cmdclass in client.commands
        } catch (error) { 
            console.log(error) // on error
        }
    };
};