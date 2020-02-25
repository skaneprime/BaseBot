let BaseCommand = require('../../classes/BaseCommand');
module.exports = class ExampleCacheCommand extends BaseCommand {
    constructor() {
        super({
            name: "cache",
            aliases: [],
            category: "example",
            usage: "",
            description: "Just an example about how to use cache of command",
            guildOnly: true,
            allowed_guilds: [],
            cooldown: 5
        });

        this.execute = (client, message, args) => {
            /* 
            cache is an object which can store anything. to clear it you can just set it as {} 
            this.cache = {}
            */
            // this.cache[args[0]] = args[1];
            // console.log(client.commands.get('cache'));
            console.log(Object.keys(require.cache).length);
        };
    };
};