const { createInterface } = require('readline');
const chalk = require('chalk')
let rl =  createInterface({ 
    input: process.stdin,
    output: process.stdout 
});

rl.question(chalk.blueBright(`Please Insert Token of your bot!: `), (answer) => {
    console.log(answer)
    process.exit(process.exitCode)
});