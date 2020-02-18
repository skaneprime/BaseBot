let chalk = require('chalk');
module.exports = {
    clear: function () {
        var lines = process.stdout.getWindowSize()[1];
        for(var i = 0; i < lines; i++) {
            console.log('\r\n');
        }
    },
    error: function (err) {
        // console.log(err.stack.split('at'))       
        console.log(`──────────────────────${chalk.red.bold('FOUND ERROR')}──────────────────────`)
        console.log(chalk.red.bold.italic(`[${err.constructor.name}]`, `=>`, err.stack));
        // console.log(`──────────────────────${chalk.red.bold('FOUND ERROR')}──────────────────────`)
    },
    log: function(...args) {
        console.log(chalk.cyan.bold('[LOG]'), args.join(' '));
    },
    sys: function(...args) {
        if(!settings.MinimalMode)
            console.log(chalk.magenta.bold('[SYSTEM]'), args.join(' '));
    },
    mod: function(...args) {
        if(!settings.MinimalMode)
            console.log(chalk.green.bold('[MODULE]'), args.join(' '));
    },
    warn: function(...args) {
        console.log(chalk.yellow.bold('[WARN]'), args.join(' '));
    },
    debug: function(...args) {
        console.log(chalk.white.bold('[DEBUG]'), args.join(' '));
    },
    info: function(...args) {
        console.log(chalk.black.bold('[INFO]'), args.join(' '));
    },
}