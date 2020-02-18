var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

module.exports = (client) => {
    app.set('view engine', 'ejs')
    app.set('views', 'G:\\MYPROJECTS\\BaseBot\\web\\views');
    app.use(express.static(path.join(__dirname, 'public')));
    console.log(path.join(__dirname));



    app.use('/about', function(req, res) {
        res.render('about', {
            title: "Главная",
            emailsVisible: true,
            emails: ["admin@satou.fun", "skaneprime@gmail.com"],
            phone: 88005553535 + 'Dick'
        })
    });

    app.use('/main', function(req, res) {
        res.render('main');
    });

    app.listen(7777, () => {
        global.cmd.info(`Server on, port listen: 7777`);
    });
};