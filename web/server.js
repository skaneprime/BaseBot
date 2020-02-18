var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

module.exports = (client) => {
    app.set('views', path.join(__dirname, 'views'));
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/about', function(req, res) {
        res.render('about', {
            title: "Главная",
            emailsVisible: true,
            emails: ["admin@satou.fun", "skaneprime@gmail.com"]
        })
    });

    app.use('/main', function(req, res) {
        console.log(cmdtable.toString())
        res.render('main'), {
            sdfdsfdsfdfds: `${gdfgfgf}`
        };
    });

    app.listen(7777, () => {
        cmd.mod(`${chalk.bold.red(`[WebServer]`)} Server on, port listen: 7777`);
    });
};