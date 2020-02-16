chalk = require('chalk');
module.exports = (fs) => {
    fs.readdirSync('./system').forEach(initSys);

    function initSys(filename) {
        console.log(`${chalk.cyan('[SYS]')} загружен системный модуль ${chalk.bold.red(filename)}`);
        require(`./system/${filename}`);
    };
}; 