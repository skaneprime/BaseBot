let BaseCommand = require('../classes/BaseCommand');
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
            cooldown: 5
        });
    };
    execute = (client, message, args) => {
        cmd.log(`Ok!`)
        cmd.sys(`Ok`)
        cmd.warn(`Ok`)
        cmd.info(`Ok`)
        cmd.debug(`Ok`)
        cmd.error(`Ok`)
    }
};