module.exports = async (client, [message]) => {
    // console.log(message.content);
    const GuildSchema = require('../../database/model/Guild'); // requiring Guild Schema
    let GuildSettings = await GuildSchema.findOne({ _id: message.guild.id}) // Searching for Guild Settings

    let channelAutoEmoji = await GuildSettings.autoReactions.find(elem => elem.HandleChannelID === message.channel.id) // Getting auto emoji channel
    if (channelAutoEmoji) {
        channelAutoEmoji.EmojisID.forEach(emoji => {
            message.react(`${emoji}`).catch(err => () => { return; });
        });
    }

    if(message.author.id === client.user.id || !message.content.startsWith(GuildSettings.prefix)) 
        return;

    const args = message.content.slice(GuildSettings.prefix.length).trim().split(/ +/g); // splitting to args
    const cmd = args.shift().toLowerCase(); // our command
    let command = client.commands.find(cmdClass => cmdClass.name === cmd || cmdClass.aliases.includes(cmd));
    if(!command) 
        return;
    // guildOnly, allowed_guilds
    if(message.channel.type === "dm" && command.guildOnly) 
        return message.reply(`Command ${cmd} is allowed only in this server!!!`);
    if(!command.allowed_guilds.includes(message.guild.id) && command.allowed_guilds.length > 0) 
        return;  
        
    // permlevel
    let checking;
    if(command.permLevel)
        checking = await checkLevel(message.author, command.permLevel, message);
    else
        checking = "ACCEPTED";
    if(checking !== "ACCEPTED") 
        return message.channel.send(`Sorry, you don't have permission to run this command. \n\nThis command only for **${checking.name}**`);
                
    // cooldown
    if(!client.cooldowns[message.guild.id]) 
        client.cooldowns[message.guild.id] = {};

    if(!client.cooldowns[message.guild.id][message.author.id]) 
        client.cooldowns[message.guild.id][message.author.id] = {};

    let GuildMember_cooldown = command.cooldown * 1000 + client.cooldowns[message.guild.id][message.author.id][command.name]; //Cooldown of user
    if(GuildMember_cooldown > new Date().getTime()) {
        let LeftTime = Math.round((GuildMember_cooldown - new Date().getTime()) / 1000)
        return message.reply(`Please wait, you can't use this command.  Wait ${LeftTime} secconds !`);
    };

    if(command) {
        client.emit('command', message, command);
        command.execute(client, message, args);
        client.cooldowns[message.guild.id][message.author.id][command.name] = new Date().getTime()
    };
};





async function checkLevel(user, level, message) {
    if(!level) return "ACCEPTED"
    let UserSchema = require('../../database/model/user');
    let result = await UserSchema.find({userID: user.id})
    if(result[0]) {
        let user_lvl = result[0].permLevel;
        let command_lvl = config.perms[level-1];
        if(user_lvl >= command_lvl.level)
            return "ACCEPTED"
        else
            return command_lvl;
    } else {
        return config.perms[level];
    }
}
