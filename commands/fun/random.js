const { MessageEmbed } = require('discord.js');
let BaseCommand = require('../../classes/BaseCommand');
module.exports = class extends BaseCommand {
    constructor() {
        super({
            name: "random",
            aliases: ["rand", "r"],
            category: "FUN",
            usage: `${client.prefix}random [min] [max]`,
            description: "Get a random number",
            guildOnly: false, // только на сервере, ЛС не используется!
            allowed_guilds: [],
            cooldown: 5 // кулдаун
        });

        this.execute = async (client, message, args, ...params) => {
            let a;
            let b;
            if (!args[0] || !args[1]) {
                a = 1;
                b = 100;
            } else {
                a = Number(args[0]);
                b = Number(args[1]);
            }
            if (isNaN(a) || isNaN(b)) return bot.send("Wrong! Input numbers.");
            let embedRoll = new MessageEmbed()
                .setColor("#14151A")
                .setTitle(`${random(a, b)}!`)
                .setDescription(`Random number between ${a} and ${b}.`)
                .setTimestamp(message.createdAt)
                .setFooter(`Requested by ${message.author.username}.`);
            message.channel.send(embedRoll);
            function random(min, max){
               min = Math.ceil(min);
               max = Math.floor(max);
               return Math.floor(Math.random() * (max - min + 1)) + min;
             };
        }
    };
};

 

