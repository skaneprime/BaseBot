module.exports = (client, params) => {
    let message = params[0];
    if(message.author.id === client.user.id || !message.content.startsWith(client.prefix)) return;
    const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
//  console.log(client.commands.get(cmd) || client.commands.find(cmdClass => cmdClass.aliases.includes(cmd)));
    let command = client.commands.get(cmd) || client.commands.find(cmdClass => cmdClass.aliases.includes(cmd));
    if(command) command.execute(client, message, args);
};

