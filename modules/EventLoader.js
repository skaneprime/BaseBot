module.exports = (client) => {
    fs.readdirSync('./events').forEach(dir => {
        if(dir === 'client') 
            fs.readdirSync('./events/client').forEach(ClientOnEvent);          
        else if (dir === 'process')
            fs.readdirSync('./events/process').forEach(ProcessOnEvent); 
    });
    
    function ClientOnEvent(event) {
        try {
            client.on(event.split('.')[0], (...params) => require(`../events/client/${event}`)(client, params)); // run event on client.event
            cmd.mod(`${chalk.bold.red(`[EventLoader]`)} ${chalk.yellow.bold('[CLIENT]')} ${chalk.bold(event)} ${chalk.bold.white(`successfully Loaded`)}`);        
        } catch (err) {
            cmd.error(`${chalk.bold.red(`[EventLoader]`)} ${chalk.yellow.bold('[CLIENT]')} ${chalk.bold(event)} ${chalk.bold.white(`${err.prototype.name}: ${err.stack}`)}`)
        }
    };
    
    function ProcessOnEvent(event) {
        try {
            process.on(event.split('.')[0], (...params) => require(`../events/process/${event}`)(client, params)); // run event on client.event
            cmd.mod(`${chalk.bold.red(`[EventLoader]`)} ${chalk.yellow.bold('[PROCESS]')} ${chalk.bold(event)} ${chalk.bold.white(`successfully Loaded`)}`);        
        } catch (err) {
            cmd.error(`${chalk.bold.red(`[EventLoader]`)} ${chalk.yellow.bold('[PROCESS]')} ${chalk.bold(event)} ${chalk.bold.white(`${err.prototype.name}: ${err.stack}`)}`)
        }
    };
    cmd.mod(`${chalk.bold.red(`[EventLoader]`)} ${chalk.bold.white(`Successfully Loaded`)}`);
};