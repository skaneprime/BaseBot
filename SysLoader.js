chalk = require('chalk');
module.exports = (fs) => {
    fs.readdirSync('./system').forEach(result => {
        if(fs.lstatSync(`./system/${result}`).isDirectory())
            fs.readdirSync('./system/'+result).forEach(r => initSys(result+'/'+r));
        else 
            initSys(result);
    });

    function initSys(filename) {
        cmd.sys(`${chalk.bold.blue(`Initializing ${filename.split('.')[0]}`)}`);
        require(`./system/${filename}`);
    };
}; 