const fs = require('fs');
module.exports = (client) => {
    fs.readdirSync('./events').forEach(ClientOnEvent); // Перебор все ивентов из конфига events.json
    
    function ClientOnEvent(event) {
        client.on(event.split('.')[0], (...params) => require(`../events/${event}`)(client, params));
    };
};