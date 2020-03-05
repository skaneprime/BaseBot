let BaseCommand = require('../../classes/BaseCommand');
const Discord = require('discord.js');
module.exports = class HelpCommand extends BaseCommand {
    constructor() {
        super({
            name: "tedit",
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
                if(ticketOptions.mode == 2 || ticketOptions.mode == 0) return message.channel.send(`Ошибка, установлен режим тикетов: ${ticketOptions.mode}\n\n\`0\` - отключёно \n\`1\` - только команда \n\`2\` - только эмодзи\n\`3\` - эмодзи + команда`)
                if(ticketOptions.channelID == 0) return message.channel.send(`У вас не настроен канал`);
                if(ticketOptions.parentID == 0) return message.channel.send(`У вас не настроена категория для создания каналов`);
                if(message.channel.id != ticketOptions.channelID) return message.channel.send(`Неправильный канал, создавать тикеты можно только в <#${ticketOptions.channelID}>`)
                if(!ticketOptions.limit) ticketOptions.limit = 999;
                let TicketSchema = require(`${appDir}/database/model/ticket`)
                let tickets = await TicketSchema.find({authorID: message.author.id});
                let limitEmbed = new Discord.MessageEmbed()
                    .setDescription(`Вы не можете создавать > ${ticketOptions.limit} тикетов`)
                    .setColor("#FF0000")
                if(tickets.length > ticketOptions.limit) return message.author.send(embed)
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
                        let successEmbed = new Discord.MessageEmbed().setDescription(`Тикет успешно создан, переход в тикет: <#${channel.id}>`).setColor("#00FF00");
                        message.author.send(successEmbed);
                    })
                } catch (error) {
                    
                }

            } else {
                return message.reply(`На сервере не настроенный параметры`)
            }
        };
    };
};