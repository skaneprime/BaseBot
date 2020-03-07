const { yellow, bold, red} = global.chalk;

let readyBig = `
██████╗ ███████╗ █████╗ ██████╗ ██╗   ██╗
██╔══██╗██╔════╝██╔══██╗██╔══██╗╚██╗ ██╔╝
██████╔╝█████╗  ███████║██║  ██║ ╚████╔╝ 
██╔══██╗██╔══╝  ██╔══██║██║  ██║  ╚██╔╝  
██║  ██║███████╗██║  ██║██████╔╝   ██║   
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝    ╚═╝   
`;

module.exports = async (client) => {
    setTimeout(() => {
        let readyInfo = `Successful logged as ${client.user.tag} [${client.user.id}]`
            +`\n       Latency: ${client.ws.ping}ms`
            +`\n       Gateway: ${client.ws.gateway.split("//")[1].split("/")[0]}`
            +`\n       ReadyAt: ${bold(new Date(client.readyTimestamp).getHours())}:${bold(new Date(client.readyTimestamp).getMinutes())}:${bold(new Date(client.readyTimestamp).getSeconds())}`;
        global.cmd.info(readyInfo);
    }, 500);
    console.log(red.bold(readyBig));
    
    client.appInfo = await client.fetchApplication();
    // console.log(client.appInfo);
    setInterval( async () => {
        client.appInfo = await client.fetchApplication();
    }, 60000);

    client.generateInvite(["ADMINISTRATOR"])
    .then(link =>{
        client.invite = link;
        global.cmd.info(yellow.bold('[INVITE]'), `${link}`);
    });
    // require('./../../modules/webLoader')();
    // memoryUsage();


    cmd.log(`Fetching all guilds from db`);
    client.guilds.cache.forEach(async guild => {
        const GuildSchema = require('../../database/model/Guild');
        let result = await GuildSchema.find({_id: guild.id})
        /* await GuildSchema.find({}).then((AllValues) => {
            console.log(AllValues)
        }); */
        
        if(!result[0]) {
            cmd.log(`Server ${guild.name} not found, creating...`);
            new GuildSchema({
                _id: guild.id,
                tickets: [{
                    parentID: null,
                    HandleChannelID: null,
                    EaMList: [{
                        EmojiID: String,
                        messagesOnInit: [],
                    }]
                }],
                autoRoleID: null,
                prefix: client.prefix
            }).save()
        } else {
            cmd.info(`Registered ${chalk.bold(guild.name)} | Members: ${chalk.bold(guild.members.cache.size)} `)
        }
    })
    cmd.log('[CACHE-LENGTH]', Object.keys(require.cache).length);

    // const GuildSchema = await require('../../database/model/Guild');
    // let GuildSettings = await GuildSchema.findOne({ _id: message.guild.id})

    //global.current_prefix = GuildSettings.prefix
};
