let BaseCommand = require('./../classes/BaseCommand');
module.exports = class TestCmd extends BaseCommand {
    constructor() {
        super({
            name: "testcmd",
            aliases: ["test", "testing", "t", "tst"],
            category: "dev",
            usage: "Без аргументов",
            description: "Тестовая команда",
            guildOnly: true,
            allowed_guilds: [],
            cooldown: 5
        });

        this.execute = (client, message, args, ...params) => {
            message.reply('SSSSS');
        };
    };
};