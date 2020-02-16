chalk = require('chalk');
module.exports = (client, fs) => {
    fs.readdirSync('./modules').forEach(initMod); // fetch modules folder, then run module.

    function initMod(filename) {
        console.log(`${chalk.cyan('[MOD]')} загружен модуль ${chalk.bold(chalk.red(filename))}`);
        require(`./modules/${filename}`)(client, fs);
    };
}; 