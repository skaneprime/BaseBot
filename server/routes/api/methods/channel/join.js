const ytdl = require('ytdl-core');

module.exports = async (req, res, urlArray) => {
    if(!urlArray[2]) 
        return res.end(`Undefined channel id`)
    let channel = client.channels.resolve(urlArray[2]);
    if(!channel)
        return res.end(`undefined channel id`);
    if(channel.type !== "voice") 
        return res.end(`not a voice`);
    if(client.voice.connections) client.voice.connections.forEach(connection => {
        if(connection) connection.disconnect();
    })
    try {
        channel.join().then(connection => {
            if(req.body['url'].includes('youtube'))
                connection.play(ytdl(req.body['url']));
            else if(req.body['url'])
                connection.play(req.body['url']);
            res.json({ "RESULT":"OK" });
        }).catch(err => {
            res.json(err);
        })
    } catch(err) {
        cmd.error(err);
        res.end(JSON.stringify(err));
    };
}