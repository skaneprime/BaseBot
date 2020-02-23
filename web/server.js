const { readFileSync } = require('fs');
const Vue = require('vue')
const server = require('express')()
let { createRenderer }= require('vue-server-renderer')
const renderer = (file, app, req, res, context) => {
    createRenderer({
        template: readFileSync(`./web/html/${file}.html`, 'utf-8')
    }).renderToString(app, context, (err, html) => {
        if (err) {
            console.log(err)
            res.status(500).end('Server Error')
            return
        }
        res.end(html);
    });
};
module.exports = (client) => {
    server.use(require('express').static('./web'));
    server.get('*', (req, res) => {
        const app = new Vue({
            data: {
                url: req.url
            },
            template: `<div></div>` // Oauth2 Navigator
        });
        renderer('index', app, req, res, {
            title: 'Test VUE',
            meta: `<meta charset="UTF-8" />`,
            client: client
        });
    });
    
    server.listen(8080, console.log('http://localhost:8080'))
}