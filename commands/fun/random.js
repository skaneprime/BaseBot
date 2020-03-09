const { MessageEmbed } = require('discord.js');
let BaseCommand = require('../../classes/BaseCommand');
const fetch = require('node-fetch');
module.exports = class extends BaseCommand {
    constructor() {
        super({
            name: "random",
            aliases: ["rand"],
            category: "FUN",
            usage: `${client.prefix}random [min] [max]`,
            description: "Get a random number",
            guildOnly: false,
            allowed_guilds: [],
            cooldown: 1
        });

        this.execute = async (client, message, args, ...params) => {
            let range = []
            range[0] = 1
            range[1] = 100
            if(args[1]){
            args[0] = Number(args[0])
            args[1] = Number(args[1])
            if(!isNaN(args[0]) && !isNaN(args[1])){
                range[0] = args[0] 
                range[1] = args[1]    
            }
        }
            
            let randomInt = tools.randomInt(range[0], range[1])
            let embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`**${randomInt}!**`)
            .setDescription(`Random number from ${range[0]} to ${range[1]}`)
            .setTimestamp()
            .setFooter(message.author.username)
            message.channel.send(embed);
        }
    };
};