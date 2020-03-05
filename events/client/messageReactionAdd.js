const Discord = require('discord.js');
module.exports = async (client, params) => { // params[0] - reaction || params[1] - user
    if(true || params[1].bot) 
        return;
    params[0].message.reactions.resolve(params[0].emoji.id).users.remove(params[1])
    let ServerSchema = require(`${appDir}/database/model/server`);
    let server = await ServerSchema.find({_id: params[0].message.guild.id});
    let uid = params[1].id;
    if(server[0]) {
        if(server[0].options.tickets.messageID === params[0].message.id) {
            let ticketOptions = server[0].options.tickets || null;
            if(!ticketOptions.emojiIDS.includes(`${params[0].emoji.id}`)) return;
            if(ticketOptions.mode === 2 || ticketOptions.mode === 0) 
                return params[1].send(`Ошибка, установлен режим тикетов: ${ticketOptions.mode}\n\n\`0\` - отключёно \n\`1\` - только команда \n\`2\` - только эмодзи\n\`3\` - эмодзи + команда`)
            if(ticketOptions.channelID === "0") 
                return params[1].send(`У сервера не указан канал`);
            if(ticketOptions.parentID === "0") 
                return params[1].send(`У сервера не настроена категория для создания каналов`);
            let TicketSchema = require(`${appDir}/database/model/ticket`)
                let tickets = await TicketSchema.find({authorID: params[1].id});
                let limitEmbed = new Discord.MessageEmbed()
                    .setDescription(`Вы не можете создавать > ${ticketOptions.limit} тикетов`)
                    .setColor("#FF0000")
                if(tickets.length >= ticketOptions.limit) return params[1].send(limitEmbed);
                try {
                    params[0].message.guild.channels.create(`ticket-${params[1].username}`, {
                        parent: ticketOptions.parentID,
                        reason: `Ticket by ${params[1].tag} | ${params[1].id}`
                    }).then(channel => {
                        let Ticket = new TicketSchema({
                            _id: channel.id,
                            authorID: uid,
                            type: 'default'
                        })
                        Ticket.save();
                        let successEmbed = new Discord.MessageEmbed().setDescription(`Тикет успешно создан, переход в тикет: <#${channel.id}>`).setColor("#00FF00");
                        params[1].send(successEmbed);
                        let infoEmbed = new Discord.MessageEmbed()
                            .setDescription(`Получен новый тикет от ${params[1]}\n${params[0].message.createdAt}\nВся переписка сохраняется!!!`)
                            .setColor("#FFF")
                        channel.send(infoEmbed)
                    })
                } catch (error) {
                    params[1].send(`Произошла ошибка, сорян :( \n\n${error.stack}`)
                }
        }
    }
};
