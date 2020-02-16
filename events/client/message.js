module.exports = (client, [message]) => {
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

    let GuildMember_cooldown = command.cooldown * 1000 + client.cooldowns[message.guild.id][message.author.id][command.name]; //Кулдаун пользователя
    if(GuildMember_cooldown > new Date().getTime()) {
        let LeftTime = Math.round((GuildMember_cooldown - new Date().getTime()) / 1000) // Оставшиеся время для окончание задержки.
        return message.reply(`Подождите, вы не можете использовать эту команду ещё ${LeftTime} секунд!`);
    };
    
    // Инициализировать команду и добавить GuildMember кулдаун.
    if(command) {
        command.execute(client, message, args);
        client.cooldowns[message.guild.id][message.author.id][command.name] = new Date().getTime()
    };
};

