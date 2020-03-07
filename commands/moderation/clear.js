const { MessageEmbed } = require('discord.js');
let BaseCommand = require('../../classes/BaseCommand');
module.exports = class extends BaseCommand {
    constructor() {
        super({
            name: "clear",
            aliases: ["c", "purge"],
            category: "MODERATION",
            usage: "",
            description: "",
            guildOnly: true, // только на сервере, ЛС не используется!
            allowed_guilds: [],
            cooldown: 1 // кулдаун
        });

        this.execute = async (client, message, args, ...params) => {
            try {
                let count = 0
                let messages = await message.channel.messages.fetch({ limit: args[0] });
                messages.forEach(msg => {
                    msg.delete().then(() => {
                        count = count + 1;
                    })
                })
                    message.channel.send(`Удалено \`${messages.size}\` сообщений`)//.then(msg => msg.delete(15000));
            } catch (error) {
                message.reply(`Ошибка! \n\n${error.message}`)
            }
        }        
    };
};
