let BaseCommand = require('../../classes/BaseCommand');
const Discord = require('discord.js');

module.exports = class GiveCommand extends BaseCommand {
    constructor() {
        super({
            name: "greetings",
            aliases: [],
            category: "ADMINISTRATION",
            usage: `${client.prefix}greetings [options]`,
            description: "Set an greeting message to new members of server in channel.",
            guildOnly: "true",
            allowed_guilds: [],
            cooldown: 0,
            permLevel: 1
        });

        this.execute = (client, message, args, ...params) => {
            const GuildSchema = require('../../database/model/Guild'); //Searching for Guild Settings

            GuildSchema.findOne({ _id: message.guild.id}).then(async GuildSettings => {  
                
            })
        }
    }
}