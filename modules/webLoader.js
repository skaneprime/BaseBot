module.exports = (client, fs) => {
     cmd.mod(`${chalk.bold.red(`[WebServer]`)} ${chalk.bold.white(`is not ready yet.`)}`);
    require('./../web/server')(client)
};