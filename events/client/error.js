module.exports = (client, [error]) => {
    if(global.settings.error) 
        require('./../../tools/console').error(error);
};