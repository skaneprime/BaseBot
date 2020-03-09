module.exports = async (req, res, urlArray) => {
    let data = req.body;
    // console.log(data);
    if(urlArray[2]) {
        channel = client.channels.resolve(urlArray[2])
    } else {
        return res.end(`Undefined channel ID`)
    }
    if(!channel) 
        return res.end(`Undefined`);
    if(data['embed'])
        channel.send(data['embed'].message, { embed: data['embed'] }).then(result => res.json(result))
    else  {
        channel.send(data['message'], { attachment: data['attachment'] }).then(result => res.json(result));
    }
};