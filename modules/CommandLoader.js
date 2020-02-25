module.exports = (client) => {
    cmd.mod(`${chalk.bold.red(`[CommandLoader]`)} ${chalk.bold.white(`Successfully Loaded`)}`);
    fs.readdirSync('./commands').forEach(result => {
        if(result == "example.form") return;
        if(fs.lstatSync(`./commands/${result}`).isFile()) {
            client.loadCommand(result.split(".")[0]);
        } else {
            fs.readdirSync(`./commands/${result}`).forEach(file => {
                client.loadCommand(file.split(".")[0], result);
            });
        };
    });
    // cmd.table(client.commands)
};