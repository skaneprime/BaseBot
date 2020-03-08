const mongoose = require('mongoose');
let { MessageEmbed } = require('discord.js');

let EaM = {
    EmojiID: String,
    messagesOnInit: Array(MessageEmbed.prototype),
};

let EaR = {
    EmojiID: String,
    RoleID: String
}

let TicketSetting = {
    parentID: String,
    HandleChannelID: String,
    EaMList: Array(EaM)
};

let RoleDispenserSetting = {
    HandleChannelID: String,
    EaRList: Array(EaR),
}

let autoReactionSetting = {
    HandleChannelID: String,
    EmojisID: Array(String)
}


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
    autoReactions: Array(autoReactionSetting),
    roleDispenser: Array(RoleDispenserSetting),
    autoRoleID: String,
    prefix: String
    //CustomCommands: Array(BaseCommand)
});

module.exports = mongoose.model("GuildsSettings", GuildSchema);