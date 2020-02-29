global.express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const client = require('./routes/api/client');
const database = require('./routes/api/database');
const command = require('./routes/api/command');


app.use('/api/client', client);
app.use('/api/database', database);
app.use('/api/command', command)


app.use(express.static(__dirname + '/public'));

// Handle SPA
app.get(/.*/, (req, res) => {
    // console.log('Test')
    res.sendFile(__dirname + '/public/index.html')
});

const port = 5000;

app.listen(port, () => cmd.mod(`${chalk.bold.red(`[WebServer]`)} http://localhost:${port}`));