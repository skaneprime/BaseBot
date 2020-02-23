const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors') 
const morgan = require('morgan')
const fs = require('fs')
const app = express()

//cmd.mod(`${chalk.bold.red(`[WebServer]`)} inicialization`);


// module.exports = (client) => {
    app.use(morgan('combine'))
    app.use(bodyParser.json())
    app.use(cors())
    let pressf = {
        "f": true
    }
    app.get('/status', (req, res) => {
        res.send({})
    })


    app.listen(3000, () => {
  //      cmd.mod(`${chalk.bold.red(`[WebServer]`)} Server on, port listen: 7777`);
        console.warn(`Сервер запущен на порту 3000`)
    });
//};