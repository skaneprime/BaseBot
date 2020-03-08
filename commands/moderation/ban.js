const { MessageEmbed } = require('discord.js');
let BaseCommand = require('../../classes/BaseCommand');
module.exports = class extends BaseCommand {
    constructor() {
        super({
            name: "ban",
            aliases: ["ban", "b"],
            category: "MODERATION",
            usage: "",
            description: "",
            guildOnly: true, // только на сервере, ЛС не используется!
            allowed_guilds: [],
            cooldown: 1,
            permLevel: 1
        });

        this.execute = async (client, message, args, ...params) => {
            let target = await tools.findMember(message, args[0]);
            if(!target) return message.reply(`Ошибка, укажите пользователя`)
            let reason = "Нет причины";
            if(args[1]) reason = args.slice(1);
            try {
                target.ban(`Забанить пользователям ${message.author.tag}`).catch(error => message.reply(error.message));
                let embed = new MessageEmbed({
                    fields: [{
                        name: `Пользователь`,
                        value: `<@${target.user.id}>`,
                        inline: true
                    },
                    {
                        name: `Администратор`,
                        value: `<@${message.author.id}>`,
                        inline: true
                    },
                    {
                        name: `Причина`,
                        value: `${reason}`,
                        inline: true
                    },
                    ]
                })
                .setTitle(`Выгоняем пользователя ${target.user.tag}`)
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setFooter(message.guild.name, message.guild.iconURL())
                .setColor("#cc0000")
                message.channel.send(embed);
            } catch (error) {
                message.reply(`Ошибка, ${error.stack}`)
            }
        }        
    };
};
