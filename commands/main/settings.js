let BaseCommand = require('../../classes/BaseCommand');
const Discord = require('discord.js');

module.exports = class GiveCommand extends BaseCommand {
    constructor() {
        super({
            name: "settings",
            aliases: [],
            category: "ADMINISTRATION",
            usage: `${client.prefix}settings [setting] [new param]`,
            description: "Set new Settings, params:\n-autorole\n-prefix",
            guildOnly: "true",
            allowed_guilds: [],
            cooldown: 0
        });

        this.execute = (client, message, args, ...params) => {
            const GuildSchema = require('../../database/model/Guild');

            GuildSchema.findOne({ _id: message.guild.id}).then(async doc => {
                console.log(doc);
                if(args.length < 1) {
                    return message.reply(
                        new Discord.MessageEmbed()
                        .setTitle(`${client.user.tag} settings for ${message.guild.name}`)
                        .setDescription(`
                            ${doc.autoRoleID ? `Auto-Role: ${message.guild.roles.cache.get(doc.autoRoleID) ? message.guild.roles.cache.get(doc.autoRoleID).name : "Invalid Role"}` : "Auto-Role: Not specified"}\n
                            ${doc.prefix ? `Prefix: ${doc.prefix}` : "Prefix: Not specified"}
                        `)
                    )
                }
                else {
                    if(args[0].toLowerCase() === '-autorole') {
                        let roleID = args[1].includes('<@&') ? args[1].slice(3, -1) : args[1];
                        console.log(roleID);
                        let role = await message.guild.roles.resolve(roleID);
                        if(role)
                            doc.autoRoleID = roleID;
                        else return message.reply(
                            new Discord.MessageEmbed()
                            .setDescription('Invalid Role')
                        )
                    }
                    if(args[0].toLowerCase() === '-prefix') {
                        if(!args[1]) {
                            return message.reply('Input new prefix!');
                        };
                        doc.prefix = args[1]
                    }
                    
                    doc.save();
                    return message.reply(
                        new Discord.MessageEmbed()
                        .setDescription(`${args[0]} specified as ${args[1]}`)
                    )
                }
            })
        }
    }
}