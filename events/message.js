module.exports = (client, params) => {
    let message = params[0];
    if(message.author.id === client.user.id || !message.content.startsWith(client.prefix)) return;
    const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
//  console.log(client.commands.get(cmd) || client.commands.find(cmdClass => cmdClass.aliases.includes(cmd)));
    let command = client.commands.get(cmd) || client.commands.find(cmdClass => cmdClass.aliases.includes(cmd));
    
    // guildOnly, allowed_guilds
    if(message.channel.type === "dm" && command.guildOnly == "true") return message.reply(`Команда ${cmd} доступа только на сервере!!!`);
    if(!command.allowed_guilds.includes(message.guild.id) && command.allowed_guilds.length > 0) return;    if(!client.cooldowns[message.author.id]) client.cooldowns[message.author.id]={}

    // cooldown
    if(!client.cooldowns[message.guild.id]) client.cooldowns[message.guild.id] = {};
    if(!client.cooldowns[message.guild.id][message.author.id]) client.cooldowns[message.guild.id][message.author.id]={}
    if(command.cooldown*1000+client.cooldowns[message.guild.id][message.author.id][command.name]>new Date().getTime()) return message.reply(`Подождите, вы не можете использовать эту команду ещё ${Math.round((command.cooldown*1000+client.cooldowns[message.guild.id][message.author.id][command.name]-new Date().getTime())/1000)} секунд!`);
    
    // run command from const cmd
    if(command) {
        command.execute(client, message, args);
        client.cooldowns[message.guild.id][message.author.id][command.name]=new Date().getTime()
    }

    // DEBUG
    //console.log(global.cooldowns) //Чтобы чекать!
    //console.log(client.commands.get(cmd) || client.commands.find(cmdClass => cmdClass.aliases.includes(cmd)));
};

