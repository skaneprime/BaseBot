module.exports = async (req, res, urlArray) => {
    let data = {};
    let channelOptions = req.body;
    if(urlArray[2] === "example") return res.json({
        name: "example",
        type: "text, voice, category",
        topic: "hello world!",
        nsfw: "true, false",
        parent: "id",
        position: "number",
    })
    if(urlArray[2]) 
        guild = client.guilds.resolve(urlArray[2])
    else
        return res.end(`Unknown guild id`);
    if(!guild) 
        return res.end(`Unknown guild id`)
    if(!channelOptions['name']) 
        return res.json({"ERROR": "UNDEFINED CHANNEL NAME"})
    console.log(req.body)
    guild.channels.create(channelOptions['name'], channelOptions, {reason: "API REQUEST"}).then(result => res.json(result));

};