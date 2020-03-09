const { MessageEmbed } = require('discord.js');
let BaseCommand = require('../../classes/BaseCommand');
const fetch = require('node-fetch');
module.exports = class extends BaseCommand {
    constructor() {
        super({
            name: "dog",
            aliases: ["puppy"],
            category: "FUN",
            usage: `${client.prefix}dog`,
            description: "Get a random dog picture",
            guildOnly: false,
            allowed_guilds: [],
            cooldown: 1
        });

        this.execute = async (client, message, args, ...params) => {
            let api = await fetch('https://api.thedogapi.com/v1/images/search') // Same thing as cat.js
            api = await api.json()
            let embed = new MessageEmbed()
            .setColor('RANDOM')
            .setImage(api[0].url)
            .setTimestamp()
            message.channel.send(embed);
            message.delete()
        }
    };
};
