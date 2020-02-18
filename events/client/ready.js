const { green, yellow, bold, red } = require('chalk');
let readyBig = `
██████╗ ███████╗ █████╗ ██████╗ ██╗   ██╗
██╔══██╗██╔════╝██╔══██╗██╔══██╗╚██╗ ██╔╝
██████╔╝█████╗  ███████║██║  ██║ ╚████╔╝ 
██╔══██╗██╔══╝  ██╔══██║██║  ██║  ╚██╔╝  
██║  ██║███████╗██║  ██║██████╔╝   ██║   
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝    ╚═╝   
`;

module.exports = (client) => {
    setTimeout(() => {
        let readyInfo = `\n${green('|')} Successful logged as ${client.user.tag} [${client.user.id}]`
            +`\n${green('|')} Latency: ${client.ws.ping}ms`
            +`\n${green('|')} Gateway: ${client.ws.gateway.split("//")[1].split("/")[0]}`
            +`\n${green('|')} ReadyAt: ${bold(new Date(client.readyTimestamp).getHours())}:${bold(new Date(client.readyTimestamp).getMinutes())}:${bold(new Date(client.readyTimestamp).getSeconds())}`;
        global.cmd.info(readyInfo);
    }, 500);
    console.log(red.bold(readyBig));
    client.generateInvite(["ADMINISTRATOR"])
    .then(link =>{
        global.cmd.info(yellow.bold('[INVITE]'), `${link}`);
    });
};


                                         