module.exports = (client, [debug]) => {
    if(global.settings.debug) 
      require('./../../tools/console').debug(debug);
};