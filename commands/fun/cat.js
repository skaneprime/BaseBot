const { MessageEmbed } = require('discord.js');
let BaseCommand = require('../../classes/BaseCommand');
const fetch = require('node-fetch');
module.exports = class extends BaseCommand {
    constructor() {
        super({
            name: "cat",
            aliases: ["kitty"],
            category: "FUN",
            usage: `${client.prefix}cat`,
            description: "Get a random cat picture",
            guildOnly: false,
            allowed_guilds: [],
            cooldown: 1
        });

        this.execute = async (client, message, args, ...params) => {
            let api = await fetch('https://api.thecatapi.com/v1/images/search') // fetching website 
            api = await api.json() //Transforming it to API
            let embed = new MessageEmbed() // Creating a new Embed
            .setColor('RANDOM')
            .setImage(api[0].url) // Specifying image url
            .setTimestamp()
            message.channel.send(embed);
            message.delete()
        }
    };
};


