let BaseCommand = require('../../classes/BaseCommand');
const Discord = require('discord.js');

module.exports = class GiveCommand extends BaseCommand {
    constructor() {
        super({
            name: "autoemoji",
            aliases: [],
            category: "ADMINISTRATION",
            usage: `${client.prefix}autoemoji [add/reset] [emoji]`,
            description: "Set an autoemoji's to channel",
            guildOnly: "true",
            allowed_guilds: [],
            cooldown: 0,
            permLevel: 1
        });

        this.execute = (client, message, args, ...params) => {
            const GuildSchema = require('../../database/model/Guild'); // Requiring our Guild Schema for data

            GuildSchema.findOne({ _id: message.guild.id })
            .then(async GuildSettings => { //Searching for Guild Settings
               let guildAutoEmoji = await GuildSettings.autoReactions.find(elem => elem.HandleChannelID === message.channel.id); // Searching for our guildAutoEmoji setting
                if(args[0] === 'add' && args[1]) { // if our first argument is "add" and if there's and second argument (in cause if does not exist will return) 
                    if(!guildAutoEmoji) { // if that does not exist we will push this message channel to GuildSetting's autoReactions.
                    GuildSettings.autoReactions.push({
                            HandleChannelID: message.channel.id, // Channel where action will be handled
                            EmojisID: [] // Emoji which are going to be handled
                        });
                        guildAutoEmoji = await GuildSettings.autoReactions.find(elem => elem.HandleChannelID === message.channel.id)
                    };
                    
                    //Here an error.
                    let GuildEmojiID = args[1].length < 6 ? args[1] : args[1].split(':')[2].slice(0,-1);

                    let GuildEmoji = await message.guild.emojis.resolve(GuildEmojiID);
                    if(GuildEmoji) // If specified emoji exist in guild we will add it to out guildAutoEmoji
                        guildAutoEmoji.EmojisID.push(GuildEmojiID)
                    else // Else  we will return a message that specified emoji does not exist in guild
                        guildAutoEmoji.EmojisID.push(GuildEmojiID)
                        message.channel.send('Created auto emoji')
                } // If first argument is equals to "reset" then we are going to reset that setting of guild 
                if(args[0] === 'reset'){
                    if(guildAutoEmoji)
                        guildAutoEmoji.EmojisID = []
                }
                
                GuildSettings.save(); // Saving GuildSetting to database;
            })
        }
    }
}