let BaseCommand = require('../../classes/BaseCommand');
const Discord = require('discord.js');

module.exports = class GiveCommand extends BaseCommand {
    constructor() {
        super({
            name: "motd",
            aliases: [],
            category: "ADMINISTRATION",
            usage: `${client.prefix}motd [options]`,
            description: "Set an greeting dm-message to new members of server.",
            guildOnly: "true",
            allowed_guilds: [],
            cooldown: 0,
            permLevel: 1
        });

        this.execute = (client, message, args, ...params) => {
            const GuildSchema = require('../../database/model/Guild'); 

            GuildSchema.findOne({ _id: message.guild.id}).then(async doc => {
                
            })
        }
    }
}