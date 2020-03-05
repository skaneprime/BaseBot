let BaseCommand = require('../../classes/BaseCommand');
module.exports = class SimpleCommand extends BaseCommand {
    constructor() {
        super({
            name: "new",
            aliases: ["new1", "new2"],
            category: "examples",
            usage: "",
            description: "1234444441",
            guildOnly: false,
            allowed_guilds: [],
            cooldown: 5,
            permLevel: 5
        });
        this.execute = async (client, message, args) => {
            db.commands.createIndex({
                
            })
        };
    }
}