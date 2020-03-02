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
        clientId: "676444288258801674",
        clientSecret: "vnRZNOkiz5ZzAI9HO6UtDebc2ngAHH9S",
        code: req.query.code,
        scope: "identify email guilds connections",
        grantType: "authorization_code",
        redirectUri: "http://localhost:5000/login/callback"
    }).then(async data => {
        console.log(data)
        let userAccessToken = data.access_token;
        res.cookie('accessToken', userAccessToken)
        res.redirect(`http://localhost:3000`)
    }); 
})


app.use(express.static(__dirname + '/public'));

// Handle SPA
app.get(/.*/, (req, res) => {
    // console.log('Test')
    res.sendFile(__dirname + '/public/index.html')
});

const port = 5000;

app.listen(port, () => cmd.mod(`${chalk.bold.red(`[WebServer]`)} http://localhost:${port}`));