module.exports = (client) => {
    fs.readdirSync('./events').forEach(dir => {
        if(dir === 'client') 
        fs.readdirSync('./events/client').forEach(ClientOnEvent);          
        else if (dir === 'process')
        fs.readdirSync('./events/process').forEach(ProcessOnEvent); 
    }); // Перебор все ивентов из конфига events.json
    
    function ClientOnEvent(event) {
        cmd.mod(`${chalk.bold.red(`[EventLoader]`)} ${chalk.bold(event)} ${chalk.bold.white(`successfully Loaded`)}`);        client.on(event.split('.')[0], (...params) => require(`../events/client/${event}`)(client, params)); // run event on client.event
    };
    
    function ProcessOnEvent(event) {
        process.on(event.split('.')[0], (...params) => require(`../events/process/${event}`)(client, params)); // run event on client.event
    };
    cmd.mod(`${chalk.bold.red(`[EventLoader]`)} ${chalk.bold.white(`Successfully Loaded`)}`);
};