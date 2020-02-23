let BaseCommand = require('../../classes/BaseCommand');
module.exports = class SimpleCommand extends BaseCommand {
    constructor() {
        super({
            name: "db",
            aliases: ["db1", "db2"],
            category: "example",
            usage: "",
            description: "DB",
            guildOnly: true,
            allowed_guilds: [],
            cooldown: 5,
            permLevel: 3
        });
        this.execute = async (client, message, args) => {
            let User = require('../../database/model/user')
            const user = new User({
                username: message.author.username,
                userID: message.author.id,
                permLevel: 0,
            });

            let result = await User.find({ userID: message.author.id})
            if(result) {
                message.channel.send(`Ваш профиль ${result[0]} уже записан в базу данных`);
            }
            if(!result[0])
              user.save()
                 .then(cmd.log)
                    .catch(err => cmd.error(err));
        }
    };
};