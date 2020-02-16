chalk = require('chalk');
module.exports = (client, fs) => {
    fs.readdirSync('./modules').forEach(initMod); // fetch modules folder, then run module.

    function initMod(filename) {
        require(`./modules/${filename}`)(client, fs);
    };
}; 