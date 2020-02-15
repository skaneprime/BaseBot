module.exports = (client, params) => {
    let message = params[0];
    if(message.author.id === client.user.id || !message.content.startsWith(client.prefix)) return;
    const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
//  console.log(client.commands.get(cmd) || client.commands.find(cmdClass => cmdClass.aliases.includes(cmd)));
    let command = client.commands.get(cmd) || client.commands.find(cmdClass => cmdClass.aliases.includes(cmd));
    if(message.channel.type === "dm" && command.guildOnly == "true") return message.reply(`Команда ${cmd} доступа только на сервере!!!`);
    if(!command.allowed_guilds.includes(message.guild.id) && command.allowed_guilds.length > 0) return;
    if(command) command.execute(client, message, args);
};

