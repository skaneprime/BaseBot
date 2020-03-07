module.exports = async (req, res, urlArray) => {
    let data = req.body;
    if(urlArray[2]) {
        channel = client.channels.resolve(urlArray[2])
    } else {
        return res.end(`Undefined channel ID`)
    }
    if(!channel) 
        return res.end(`Undefined`);
    if(data['embed'])
        channel.send(data['message'], { embed: data['embed'] }).then(result => res.json(result))
    else 
        channel.send(data['message']).then(result => res.json(result));
};