module.exports = (client, fs) => {
    return cmd.mod(`${chalk.bold.red(`[WebServer]`)} ${chalk.bold.white(`is not ready yet.`)}`);
    require('./../web/server')(client)
};