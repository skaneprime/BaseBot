chalk = require('chalk');
module.exports = (fs) => {
    fs.readdirSync('./system').forEach(initSys);

    function initSys(filename) {
        cmd.sys(`${chalk.bold.blue(`Initializing ${filename.split('.')[0]}`)}`);
        require(`./system/${filename}`);
    };

    // ***********************
    Object.size = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };
}; 