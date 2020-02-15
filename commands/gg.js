let BaseCommand = require('../classes/BaseCommand');
module.exports = class TestCmd extends BaseCommand {
    constructor() {
        super({
            name: "gg",
            aliases: ["ggg", "gggg", "ggggg", "gggggg"],
            category: "dev",
            usage: "Без аргументов",
            description: "Тестовая команда",
            guildOnly: true,
            allowed_guilds: [],
            cooldown: 10
        });

        this.execute = (client, message, args, ...params) => {
            message.reply('SSSSS');
        };
    };
};