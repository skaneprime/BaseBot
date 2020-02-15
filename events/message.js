module.exports = (client, params) => {
    
    let message = params[0];
    if(message.author.id === client.user.id || !message.content.startsWith(client.prefix)) return;
    const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if(!global.cooldowns[message.author.id])global.cooldowns[message.author.id]={}
//  console.log(client.commands.get(cmd) || client.commands.find(cmdClass => cmdClass.aliases.includes(cmd)));
    let command = client.commands.get(cmd) || client.commands.find(cmdClass => cmdClass.aliases.includes(cmd));
    if(command.cooldown*1000+global.cooldowns[message.author.id][command.name]>new Date().getTime())
        return message.reply(`Подождите, вы не можете использовать эту команду ещё ${Math.round((command.cooldown*1000+global.cooldowns[message.author.id][command.name]-new Date().getTime())/1000)} секунд!`);
   
    if(command) command.execute(client, message, args);
    
    global.cooldowns[message.author.id][command.name]=new Date().getTime()
    
    //console.log(global.cooldowns) //Чтобы чекать!
    
};

