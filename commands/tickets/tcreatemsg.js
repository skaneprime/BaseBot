let BaseCommand = require('../../classes/BaseCommand');
const Discord = require('discord.js');
module.exports = class HelpCommand extends BaseCommand {
    constructor() {
        super({
            name: "tcreatemsg",
            aliases: ["ticket"],
            category: "tickets",
            usage: ``,
            description: "Создать тикет",
            guildOnly: "true",
            allowed_guilds: [],
            cooldown: 5
        });

        this.execute = async (client, message, args, ...params) => {
            if(args[0] === "react") return message.channel.send(args.slice(2)).then(async msg => {
                msg.react(args[1]);
                let Schema = require(`${appDir}/database/model/server`)
                let result = await Schema.findOne({_id: message.guild.id});
                if(result)
                    result.options.tickets.messageID = msg.id;
                result.save();
            })
        };
    };
};