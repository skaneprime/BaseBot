let BaseCommand = require('../../classes/BaseCommand');
const Discord = require('discord.js');
module.exports = class HelpCommand extends BaseCommand {
    constructor() {
        super({
            name: "tcreate",
            aliases: ["ticket"],
            category: "tickets",
            usage: ``,
            description: "Создать тикет",
            guildOnly: "true",
            allowed_guilds: [],
            cooldown: 5
        });

        this.execute = async (client, message, args, ...params) => {
            let ServerSchema = require(`${appDir}/database/model/server`); 
            let server = await ServerSchema.find({_id: message.guild.id});
            let ticketOptions = server[0].options.tickets || null;
            if(ticketOptions) {
                console.log(ticketOptions)
                if(ticketOptions.mode == 2 || ticketOptions.mode == 0) 
                    return message.channel.send(`Error, Ticket Mode is: ${ticketOptions.mode}\n\n\`0\` - disabled \n\`1\` - only command \n\`2\` - only emoji\n\`3\` - emoji and command`)
                if(ticketOptions.channelID == 0) 
                    return message.channel.send(`Channel is not specified`);
                if(ticketOptions.parentID == 0) 
                    return message.channel.send(`Parent channel is not specified`);
                if(message.channel.id != ticketOptions.channelID) return message.channel.send(`Wrong channel, tickets can be created at <#${ticketOptions.channelID}>`)
                if(!ticketOptions.limit) ticketOptions.limit = 999;
                let TicketSchema = require(`${appDir}/database/model/ticket`)
                let tickets = await TicketSchema.find({authorID: message.author.id});
                let limitEmbed = new Discord.MessageEmbed()
                    .setDescription(`You can't create more than ${ticketOptions.limit} tickets`)
                    .setColor("#FF0000")
                if(tickets.length > ticketOptions.limit) return message.author.send(limitEmbed)
                try {
                    message.guild.channels.create(`ticket-${message.author.username}`, {
                        parent: ticketOptions.parentID,
                        reason: `Ticket by ${message.author.tag} | ${message.author.id}`
                    }).then(channel => {
                        let Ticket = new TicketSchema({
                            _id: channel.id,
                            authorID: message.author.id,
                            type: 'default'
                        })
                        Ticket.save();
                        let successEmbed = new Discord.MessageEmbed().setDescription(`Ticket was created successfully : <#${channel.id}>`).setColor("#00FF00");
                        message.author.send(successEmbed);
                        let infoEmbed = new Discord.MessageEmbed()
                            .setDescription(`Received new ticket from ${message.author}\n${message.createdAt}\nAll dialogues are saved!!!`)
                            .setColor("#FFF")
                        channel.send(infoEmbed)
                    })
                } catch (error) {
                    message.reply(error);
                }

            } else {
                return message.reply(`Guild settings are not specified.`)
            }
        };
    };
};