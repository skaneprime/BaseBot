let commands = new mongoose.Schema({
    name: String,
    aliases: Array,
    category: String,
    usage: String,
    description: String,
    guildOnly: Boolean,
    allowed_guilds: Array,
    cooldown: Number,
    execute: Function // Not working
});

module.exports = mongoose.model("commands", commands);