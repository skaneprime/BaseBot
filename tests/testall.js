const fs = require('fs');

fs.readdirSync('./tests').forEach(filename => {
    if(filename === 'testall.js') 
        return;
    else 
        require('./' + filename);
});