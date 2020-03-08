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
            cooldown: 1
        });

        this.execute = (client, message, args, ...params) => {
            const GuildSchema = require('../../database/model/Guild'); // requiring GuildSchema

            GuildSchema.findOne({ _id: message.guild.id}).then(async GuildSettings => { // Searching for Guild's Settings
                // console.log(GuildSettings);
                if(args.length < 1) { // If or arguments array is empty then we will return message which will display Guild's Settings
                    return message.reply(
                        new Discord.MessageEmbed()
                        .setTitle(`${client.user.tag} settings for ${message.guild.name}`)
                        .setDescription(`
                            ${GuildSettings.autoRoleID ? `Auto-Role: ${message.guild.roles.cache.get(GuildSettings.autoRoleID) ? message.guild.roles.cache.get(GuildSettings.autoRoleID).name : "Invalid Role"}` : "Auto-Role: Not specified"}\n
                            ${GuildSettings.prefix ? `Prefix: ${GuildSettings.prefix}` : "Prefix: Not specified"}
                        `)
                    )
                }
                else {
                    if(args[0].toLowerCase() === '-autorole') { // If our first argument is -autorole
                        let roleID = args[1].includes('<@&') ? args[1].slice(3, -1) : args[1]; // Getting Role Id from second argument (it's actually mention) also we could get it as message.mentions.roles.first().id
                        let role = await message.guild.roles.resolve(roleID); // Fetching role
                        if(role) // If role exist we change it in GuildSettings.autoRoleID
                            GuildSettings.autoRoleID = roleID;
                        else return message.reply( // or if role is invalid we return new Message
                            new Discord.MessageEmbed()
                            .setDescription('Invalid Role')
                        )
                    }
                    if(args[0].toLowerCase() === '-prefix') { // If our first argument is -prefix we are going to set a new Guild prefix for bot. 
                        if(!args[1]) {
                            return message.reply('Input new prefix!'); // If second arg not exist we'll return a new message 
                        };
                        GuildSettings.prefix = args[1]
                    }
                    
                    GuildSettings.save(); // saving to database
                    return message.reply( // Simply we are going to return a message with new changes 
                        new Discord.MessageEmbed()
                        .setDescription(`${args[0]} specified as ${args[1]}`)
                    )
                }
            })
        }
    }
}