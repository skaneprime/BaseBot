module.exports = (client, [warn]) => {
    if(global.settings.warns > 2) 
        require('./../../tools/console').warn(warn);
}