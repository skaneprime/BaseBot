const { green, yellow } = require('chalk');
module.exports = (client) => {
    global.cmd.info(`Successful logged as ${client.user.tag}`);
    global.cmd.info("Guilds:");
    client.guilds.cache.forEach(g => global.cmd.log(`${g.name} found!`));

    client.generateInvite(["ADMINISTRATOR"])
    .then(link =>{
        global.cmd.info(yellow.bold('[INVITE]'), `${link}`);
    });
};