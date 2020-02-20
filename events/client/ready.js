const { green, yellow, bold, red, gray} = chalk;
const os = require('os');
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
    

    // client.generateInvite(["ADMINISTRATOR"])
    // .then(link =>{
    //     global.cmd.info(yellow.bold('[INVITE]'), `${link}`);
    // });

    memoryUsage();
    // console.log(await database.find('commands'))
    // console.log(await database.insert('commands', { name: 'twice' }))
};
