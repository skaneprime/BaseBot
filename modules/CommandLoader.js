module.exports = (client, fs) => {
    fs.readdirSync('./commands').forEach(directories => {
        if(directories === "example.form") return;
        fs.readdirSync(`./commands/${directories}`).forEach(file => LoadFile(file, directories));

    });

    function LoadFile(filename, dir) {
        if(filename.split('.')[1] != "js") return;
        client.loadCommand(filename.split(".")[0], dir);
    };
};
