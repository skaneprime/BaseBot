module.exports = (client, fs) => {
    fs.readdirSync('./commands').forEach(directories => { // fetch directories from ./commands
        if(directories === "example.form") return; // if example.form return;
        fs.readdirSync(`./commands/${directories}`).forEach(file => LoadFile(file, directories)); // run command from directory
    });

    function LoadFile(filename, dir) {
        if(filename.split('.')[1] != "js") return; // if file extension != js return;
        client.loadCommand(filename.split(".")[0], dir); // loadcommand
    };
};
