var fs = require('fs');
var url = require('url');

function renderHtml(path, res) {
    fs.readFile(path, null, function(err, data) {
        if(err) 
            notFound(res);
        else 
            res.write(data);
    });
};

function notFound(req, res) {
    res.writeHead(404);
    res.write('СКАТИНА И НУ НАХРЕНА ТЫ СЮДА ЗАШЁЛ Я ЖЕ ТЕБЯ ПО АЙПИ ВЫЧИСЛЮ ДЕБИЛ!!!   ');
    res.end();
};
module.exports = {
    handleRequest: function(req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});

        var path = url.parse(req.url).pathname;
        switch (req.url) {
            case '/':
                renderHtml('./html/index.html');
                break;
            default:
                notFound(req, res);
                break;
        };
    },
};