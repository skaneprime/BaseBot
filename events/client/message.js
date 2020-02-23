module.exports = async (client, [message]) => {
    if(message.author.id === client.user.id || !message.content.startsWith(client.prefix)) 
        return;
    const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    let command = client.commands.find(cmdClass => cmdClass.name === cmd || cmdClass.aliases.includes(cmd));
    if(!command) 
        return;
    // guildOnly, allowed_guilds
    if(message.channel.type === "dm" && command.guildOnly) 
        return message.reply(`Команда ${cmd} доступа только на сервере!!!`);
    if(!command.allowed_guilds.includes(message.guild.id) && command.allowed_guilds.length > 0) 
        return;    

        
    // cooldown
    if(!client.cooldowns[message.guild.id]) 
        client.cooldowns[message.guild.id] = {};

    if(!client.cooldowns[message.guild.id][message.author.id]) 
        client.cooldowns[message.guild.id][message.author.id] = {};

    // Система premslevel
    let checking = await checklevel(message.author, command.permLevel, message);
    if(!checking) 
        return message.channel.send(`Sorry, you don't have permission to run this command. \n\nThis command only for **${checking.NAME}**`);

    let GuildMember_cooldown = command.cooldown * 1000 + client.cooldowns[message.guild.id][message.author.id][command.name]; //Кулдаун пользователя
    if(GuildMember_cooldown > new Date().getTime()) {
        let LeftTime = Math.round((GuildMember_cooldown - new Date().getTime()) / 1000) // Оставшиеся время для окончание задержки.
        return message.reply(`Подождите, вы не можете использовать эту команду ещё ${LeftTime} секунд!`);
    };
    
    // Инициализировать команду и добавить GuildMember кулдаун.
    if(command) {
     //   client.emit('command', message, command);
        command.execute(client, message, args);
        client.cooldowns[message.guild.id][message.author.id][command.name] = new Date().getTime()
    };
};

async function checklevel(user, level, message) {
    let UserSchema = require('../../database/model/user');
    const userdb = new UserSchema({
        username: user.username,
        userID: user.id,
        permLevel: 0
    })
    let result = await UserSchema.find({userID: user.id})
    if(result[0]) {
        let user_lvl = result[0].permLevel;
        let command_lvl = config.perms[level];
        if(user_lvl >= command_lvl.level)
            return true
        else
            return command_lvl;
    } else {
        userdb.save();
        return config.perms[level];
    }
}
