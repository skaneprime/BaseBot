let BaseCommand = require('./../classes/BaseCommand');
module.exports = class TestCmd extends BaseCommand {
    constructor() {
        super({
            name: "fffff",
            aliases: ["ffffff", "fffffff", "fffffff", "ffffffff"],
            category: "dev",
            usage: "Без аргументов",
            description: "Тестовая команда",
            guildOnly: true,
            allowed_guilds: [],
            cooldown: 0
        });

        this.execute = (client, message, args, ...params) => {
            message.reply('SSSSS');
        };
    };
};