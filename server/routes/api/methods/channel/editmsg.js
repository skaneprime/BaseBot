module.exports = async (req, res, urlArray) => {
    let data = req.body;
    data['delete'] = "";
    if(urlArray[2]) 
        channel = client.channels.resolve(urlArray[2])
    if(!channel) return res.end(`Error`)
    if(urlArray[3])
        message = await channel.messages.fetch(urlArray[3])
    if(!message) return res.end(`Error`)
    if(urlArray[4] === "delete") {
        res.end(`delete`)
        return message.delete()
    }
    if(data['embed'])
        message.edit(data['message'])       
    else
        message.edit(data['message'])
    res.end(`Ok`)
}