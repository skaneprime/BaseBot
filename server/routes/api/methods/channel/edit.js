module.exports = async (req, res, urlArray) => {
    let data = {}
    let channel = req.body;
    if(urlArray[2]) 
        oldChannel = await client.channels.resolve(urlArray[2])
    else
        return res.end(`Unknown channel id`);
    if(!oldChannel) 
        return res.end(`Unknown channel id`)
    Object.keys(req.body).forEach(key => {
        if(oldChannel[key] !== channel[key]) {
            data[key] = channel[key];
            oldChannel.edit(data, 'API REQUEST').catch(error => {
                res.end(error);
            });
        }
    });
    res.json(oldChannel)
};