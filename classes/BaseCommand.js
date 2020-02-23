const SuperStorage = require('./SuperStorage');
module.exports = class BaseCommand {
    constructor(data) {
        this.name = data.name || 'unnamed'; // Name of command
        this.category = data.category || "Undefined"; // Category of command 
        this.usage = data.usage || "Undefined"; // Usage of command
        this.description = data.description || "Undefined"; // Description of command
        this.guildOnly = data.guildOnly || true; // Check can user use command only in guild or dm also.
        this.invisible = data.invisible || false; // if true will not included in help
        this.aliases = data.aliases || []; // Aliases of command. Each of them is Array element
        this.allowed_guilds = data.allowed_guilds || []; // Allowed guild array. Each element is id of guild. Empty Array to disable this.
        this.cooldown = data.cooldown || 0; // cooldown of command
        this.cache = new SuperStorage(); // Cache of command
        this.permLevel = data.permLevel || 0;

        this.execute = (client, message, args, ...params) => {
            message.reply('Command does not have any functionality.');
        };
    };
};