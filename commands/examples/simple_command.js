let BaseCommand = require('../../classes/BaseCommand');
module.exports = class extends BaseCommand {
    constructor() {
        super({
            name: "test",
            aliases: ["test1", "test2"],
            category: "example",
            usage: "",
            description: "Just an simple command without and func",
            guildOnly: true,
            allowed_guilds: [],
            cooldown: 5
        });
    };
};