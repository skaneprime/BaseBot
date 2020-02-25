let commands = new mongoose.Schema({
    name: String,
    aliases: Array,
    category: String,
    usage: String,
    description: String,
    guildOnly: Boolean,
    allowed_guilds: Array,
    cooldown: Number
});

module.exports = mongoose.model("commands", commands);