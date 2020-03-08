const SuperStorage = require('./SuperStorage');
module.exports = class BaseCommand {
    constructor(data) {
        this.name = data.name || 'unnamed'; // Name of command
        this.category = data.category || "Undefined"; // Category of command 
        this.usage = data.usage || "Undefined"; // Usage of command
        this.description = data.description || "Undefined"; // Description of command
        this.guildOnly = data.guildOnly || true; // Checks if command able to use in DMChannel and TextChannel or only TextChannel of guild   
        this.invisible = data.invisible || false; // On true it won't appear on Help command (Useful if there's some secret commands)
        this.aliases = data.aliases || []; // Aliases of command. Each of them is string
        this.allowed_guilds = data.allowed_guilds || []; // Allowed guilds array. Each element is guild id. Empty Array will disable this function.
        this.cooldown = data.cooldown || 0; // cooldown of command in seconds
        this.cache = new SuperStorage(); // Cache of command which is SuperStorage. 
        this.permLevel = data.permLevel || 0; // Permission level of command
        this.execute = data.execute || function (client, message, args, ...params) { // Function of command on Init. (Actually if command does not have execute func then this will be used)
            message.reply('Command does not have any functionality.');
        };
    };
};