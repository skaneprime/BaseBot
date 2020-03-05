global.mongoose = require('mongoose');
global.MongoClient = require('mongodb').MongoClient;
// cmd.sys(`${chalk.cyan.bold('[DATABASE]')} Required!`)
module.exports = {
    
    getScheme: function (name) {
        try {
            let requiredScheme = require(`./model/${name}`);
            if(settings.debug > 2)
                cmd.debug(`${chalk.cyan.bold('[DATABASE]')}`, requiredScheme)
            return requiredScheme;
        } catch (error) {
            if(settings.error === 1)
                cmd.error(`${chalk.cyan.bold('[DATABASE] (ERROR)')}`, error)
        };
    },

    connect: function (url, options) {
        try {
            mongoose.connect(url, options).then(conn => {
                global.connection = conn;
                cmd.sys(`${chalk.cyan.bold('[DATABASE]')} ${chalk.green.red('Mongoose')} ${chalk.green.bold('Connected')}!`)
            })
            MongoClient.connect(url, function(err, connect) {
                if(err) return cmd.error(err);
                global.db = connect;
                cmd.sys(`${chalk.cyan.bold('[DATABASE]')} ${chalk.green.red('MongoClient')} ${chalk.green.bold('Connected')}!`)
            });
        } catch (err) {
            cmd.error(err);
        }
    },

    find: function(tableName, data, type) {
        if(!data)
            data = {};
        return new Promise((resolve, reject) => {        
            if(!this.getScheme(tableName))
                return reject('Table not exist');
            if(settings.debug > 1)
                cmd.debug('Table exist')
            if(!type && !this.getScheme(tableName)[type]) 
                type = 'find';
            if(settings.debug > 1)
                cmd.debug('Type is ok')
            setTimeout(() => {
                this.getScheme(tableName)[type](data, function (err, docs) {
                    if(settings.debug > 2)
                        cmd.debug(err, docs);
                    if(err)
                        return reject(err);
                    return resolve(docs);
                });
            }, 1);
        });
    },

    insert: function (tableName, data) {
        return new Promise(async (resolve, reject) => {
            let table = this.getScheme(tableName);
            new table(data).save();
            resolve(await this.find(tableName));
        });
    },

    connection: mongoose.connection,

}; 