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
    require('./../../modules/webLoader')();
    // memoryUsage();
    // console.log(await database.find('commands'))
    // console.log(await database.insert('commands', { name: 'twice' }))

    // setInterval(() => {
    //     client.guilds.cache.get('657586144791363594').channels
    // }, 500)

    console.log(Object.keys(require.cache).length);


    cmd.log(`Fetch all guilds in db`);
    client.guilds.cache.forEach(async guild => {
        let ServerSchema = require('../../database/model/server');
        let result = await ServerSchema.find({_id: guild.id})
        if(!result[0]) {
            cmd.log(`Server ${guild.name} not found, start creating`);
            let Server = new ServerSchema({
                _id: guild.id,
                name: guild.name,
                options: {
                    tickets: {
                        mode: 1,
                        parentID: 0,
                        channelID: 0,
                        limit: 1
                    }
                }
            })
            Server.save();
        } else {
            cmd.info(`Registed ${chalk.bold(guild.name)} | Members: ${chalk.bold(guild.members.cache.size)} `)
        }
    })

};
