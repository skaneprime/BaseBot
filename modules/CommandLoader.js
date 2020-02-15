module.exports = (client, fs) => {
    fs.readdirSync('./commands').forEach(LoadFile);

    function LoadFile(filename) {
        if(filename.split('.')[1] != "js") return;
        client.loadCommand(filename.split(".")[0]);
    };
};
