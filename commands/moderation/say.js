const { MessageEmbed } = require('discord.js');
let BaseCommand = require('../../classes/BaseCommand');
module.exports = class extends BaseCommand {
    constructor() {
        super({
            name: "say",
            aliases: ["s", "saying"],
            category: "MODERATION",
            usage: "",
            description: "",
            guildOnly: true, // только на сервере, ЛС не используется!
            allowed_guilds: [],
            cooldown: 1,
            permLevel: 1
        });

        this.execute = async (client, message, args, ...params) => {
            try {
                if(args.includes('embed')) {

                }
            } catch (error) {
                message.reply(`Ошибка! \n\n${error.message}`)
            }
        }        
    };
};
