const mongoose = require('mongoose');
let { MessageEmbed } = require('discord.js');

let EaM = {
    EmojiID: String,
    messagesOnInit: Array(MessageEmbed.prototype),
}

let TicketSetting = {
    parentID: String,
    HandleChannelID: String,
    EaMList: Array(EaM)
};

// let BaseCommand = require('../../classes/BaseCommand');

// class BaseCommandSchema extends mongoose.SchemaType {
//     cast(Command) { 
//         console.log(Command);
//         return Command;
//     }
// }

// mongoose.Schema.Types.BaseCommand = BaseCommandSchema;

let GuildSchema = new mongoose.Schema({
    _id: String,
    tickets: Array(TicketSetting),
    autoRoleID: String,
    prefix: String
    //CustomCommands: Array(BaseCommand)
});

module.exports = mongoose.model("GuildsSettings", GuildSchema);