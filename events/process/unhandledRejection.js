module.exports = (client, [error]) => {
    if (error.name.includes('TOKEN_INVALID'))
        InvalidToken();
    else
        cmd.error(error);
};

function InvalidToken() {
    const { question } = require('readline-sync');
    const { writeFileSync }= require('fs');
    let token = question(`\n${chalk.gray(`${chalk.red.bold('--TOKEN IS INVALID--')}\nYou can get it from [https://discordapp.com/developers/applications/]`)}\nPlease input [${chalk.yellow.bold('token')}] of your bot! ${chalk.green.bold(`(String)`)}: `)
    config.client.token = token;
    client.login(token);
    writeFileSync(`./configuration/client.json`, `${JSON.stringify(config.client, null, "\t")}`);
}