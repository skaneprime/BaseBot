module.exports = (client, fs) => {
    fs.readdirSync('./modules').forEach(initMod);

    function initMod(filename) {
        console.log(`[MOD] ${filename} loaded`);
        require(`./modules/${filename}`)(client, fs);
    };
}; 