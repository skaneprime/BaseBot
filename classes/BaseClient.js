const { Client, Collection } = require('discord.js');
module.exports = class BaseClient extends Client {
    constructor() {
        super(global.config.client);

        this.prefix = global.config.client.prefix;

        this.commands = new Collection();
    };

    loadCommand(name) {
        try {
            const cmdClass = require(`./../commands/${name}.js`);
            this.commands.set(name, new cmdClass);
        } catch (error) {
            console.log(error)
        }
    };
};