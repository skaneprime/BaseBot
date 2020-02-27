const express = require('express');
const router = express.Router();

// Get Posts
// router.get
router.get('/test' + /.*/, async (req, res) => {
    const access = (obj, str) => str.split('.').reduce((acc, val) => acc[val], obj)
    // console.log(access(client, req.url.split("/").slice(1)))
    console.log(req.url.split(".") + "    " + req.url.slice(1));
    res.json(access(client, req.url.slice(1)))
}); 

router.get(/.*/, async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json', 'charset=utf-8');
        let dad = req.url.split("/").slice(1);
        let c = client;
        dad.forEach((key, i) => {
            
            if(["getbyid", 'gbi'].includes(key.toLowerCase())) {
                return c = c.get(dad[i+1])
            } 
            if(isNaN(parseInt(key)))
                c = c[key];
            if(!key.length)
                c = client;
        });
        
        // if(c != client) {
        res.status(200);
        return res.end(JSON.stringify(c/*))*/, null, "\t"));
        // }
    } catch (err) {
        res.end(JSON.stringify(err));
    }
});

module.exports = router;

