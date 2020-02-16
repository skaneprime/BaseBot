let BaseCommand = require('../../classes/BaseCommand');
const Discord = require('discord.js');
module.exports = class TestCmd extends BaseCommand {
    constructor() {
        super({
            name: "help",
            aliases: ["помощь", "helpme", "command", "hello"],
            category: "main",
            usage: "Без аргументов",
            description: "Тестовая команда",
            guildOnly: "true",
            allowed_guilds: [],
            cooldown: 6
        });

        this.execute = (client, message, args, ...params) => {
            let embed = new Discord.MessageEmbed()
            .setTitle(`Информация о командах BaseBot`)
            .setDescription(`Команды:`)
            client.commands.forEach(cmd => {
                embed.addField(`Команда [.${cmd.name}] | Алиасы: **${cmd.aliases.join(", ")}**`, `Категория: **${cmd.category}** | Описание: **${cmd.description}**`)
            })
            message.channel.send(embed);
        };
    };
};