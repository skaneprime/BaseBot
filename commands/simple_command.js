let BaseCommand = require('../classes/BaseCommand');
module.exports = class TestCmd extends BaseCommand {
    constructor() {
        super({
            name: "fffff",
            aliases: ["ffffff", "fffffff", "fffffff", "ffffffff"],
            category: "dev",
            cache: {"token": client.token},
            usage: "Без аргументов",
            description: "Тестовая команда",
            guildOnly: true,
            allowed_guilds: [],
            cooldown: 5
        });
    };
};