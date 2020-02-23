chalk = require('chalk');

global.cmd = require('./tools/console');
fs.readdirSync('./system').forEach(async result => {
    if(fs.lstatSync(`./system/${result}`).isDirectory())
        fs.readdirSync('./system/'+result).forEach(r => initSys(result+'/'+r));
    else 
        await initSys(result);
});

async function initSys(filename) {
    cmd.sys(`${chalk.bold.blue(`Initializing ${filename.split('.')[0]}`)}`);
    await require(`./system/${filename}`);
}; 