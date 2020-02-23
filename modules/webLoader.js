module.exports = (client, bool) => {
    // return cmd.mod(`${chalk.bold.red(`[WebServer]`)} ${chalk.bold.white(`is not ready yet.`)}`);
    require('../web/server.js')(client)
};