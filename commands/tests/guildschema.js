let BaseCommand = require('../../classes/BaseCommand');
var mongoose = require('mongoose');
let { MessageEmbed } = require('discord.js');

// const loadClass = require('mongoose-class-wrapper');

module.exports = class SimpleCommand extends BaseCommand {
    constructor() {
        super({
            name: "_guildschema_test",
            aliases: [],
            category: "tests",
            usage: "",
            description: "1234444441",
            guildOnly: true,
            allowed_guilds: [],
            cooldown: 5,
            permLevel: 5,
            invisible: true
        });
        this.execute = async (client, message, args) => {
            // let GuildSetting = require(`./../../database/model/Guild`);
            // if(args[0] === "f") {
            //     let data = await GuildSetting.findOne({ _id: message.guild.id });
            //     let test1 = new data[0]();
            //     console.log(test1)
            //     return;
            // }
            // new GuildSetting({ 
            //     _id: message.guild.id,
            //     tickets: [
            //         {
            //             parentID: message.channel.id,
            //             HandleChannelID: message.channel.id,
            //             EaMList: [{
            //                 EmojiID: '123',
            //                 messagesOnInit: [
            //                     new MessageEmbed()
            //                     .setDescription("test"),
            //                     new MessageEmbed()
            //                     .setDescription('test2')
            //                 ]
            //             }]
            //         }
            //     ],
            //     CustomCommands: [client.commands.first()]
            // }).save();
        };
    }
}