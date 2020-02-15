module.exports = (client, fs) => {
    fs.readdirSync('./commands').forEach(LoadFile);

    function LoadFile(filename) {
        client.loadCommand(filename.split(".")[0]);
    };
};
