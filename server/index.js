global.express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const DiscordOauth2 = require('discord-oauth2');
const oauth2 = new DiscordOauth2();
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

app.get('/login/callback', (req, res) => {
    console.log(req.query)
    oauth2.tokenRequest({
        clientId: "644900662890463243",
        clientSecret: "7H5KzNoK-hMIjvJz-CuQ9rwNa5FSgRuk",
        code: req.query.code,
        scope: "identify email guilds connections",
        grantType: "authorization_code",
        redirectUri: "http://localhost:5000/login/callback"
    }).then(async data => {
        console.log(data)
        let userAccessToken = data.access_token;
        res.cookie('accessToken', userAccessToken)
        res.redirect(`http://localhost:5000`)
    }); 
})


app.use(express.static('./react-app/build'));

// Handle SPA
app.get(/.*/, (req, res) => {
    // console.log('Test')
    res.sendFile('./react-app/build/index.html')
});

const port = 5000;

app.listen(port, () => cmd.mod(`${chalk.bold.red(`[WebServer]`)} http://localhost:${port}`));