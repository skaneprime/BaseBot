module.exports = (fs) => {
    fs.readdirSync('./system').forEach(initSys);

    function initSys(filename) {
        console.log(`[SYS] ${filename} loaded`);
        require(`./system/${filename}`);
    };
}; 