module.exports = (client, [warn]) => {
    if(global.settings.warns) 
        require('./../../tools/console').warn(warn);
}