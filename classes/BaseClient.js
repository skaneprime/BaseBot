const { Client, Collection } = require('discord.js');
module.exports = class BaseClient extends Client {
    constructor() {
        super(global.config.client);

        this.prefix = global.config.client.prefix;

        this.commands = new Collection();
        this.cooldowns = {};
    };

    loadCommand(name, dir) {
        try {
            const cmdClass = require(`./../commands/${dir}/${name}.js`);
            this.commands.set(name, new cmdClass);
        } catch (error) {
            console.log(error)
        }
    };
};