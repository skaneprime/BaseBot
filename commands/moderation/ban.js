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
            guildOnly: true,
            allowed_guilds: [],
            cooldown: 1,
            permLevel: 1
        });

        this.execute = async (client, message, args, ...params) => {
            let target = await tools.findMember(message, args[0]);
            if(!target) return message.reply(`Error, specify user`)
            let reason = "No reason specified";
            if(args[1]) reason = args.slice(1);
            try {
                target.ban(`Ban user ${message.author.tag}`).catch(error => message.reply(error.message));
                let embed = new MessageEmbed({
                    fields: [{
                        name: `User`,
                        value: `<@${target.user.id}>`,
                        inline: true
                    },
                    {
                        name: `Admin`,
                        value: `<@${message.author.id}>`,
                        inline: true
                    },
                    {
                        name: `Reason`,
                        value: `${reason}`,
                        inline: true
                    },
                    ]
                })
                .setTitle(`Banning user ${target.user.tag}`)
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setFooter(message.guild.name, message.guild.iconURL())
                .setColor("#cc0000")
                message.channel.send(embed);
            } catch (error) {
                message.reply(`Error, ${error.stack}`)
            }
        }        
    };
};
