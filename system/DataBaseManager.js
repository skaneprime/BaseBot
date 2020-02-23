global.mongoose = require('mongoose');
global.database = require('./../database/index');
database.connect(config.database.url, config.database.options);