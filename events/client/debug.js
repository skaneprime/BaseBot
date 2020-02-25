module.exports = (client, [debug]) => {
    if(global.settings.debug > 2) 
      require('./../../tools/console').debug(debug);
};