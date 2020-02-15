let BaseCommand = require('./../classes/BaseCommand');
module.exports = class TestCmd extends BaseCommand {
    constructor() {
        super({
            name: "testcmd",
            aliases: ["test", "testing", "t", "tst"],
            category: "dev",
            usage: "Без аргументов",
            description: "Тестовая команда",
            guildOnly: "true",
            allowed_guilds: ["664158117227134996", "653191169328676874"],
            cooldown: 6
        });

        this.execute = (client, message, args, ...params) => {
            message.reply('SSSSS');
        };
    };
};