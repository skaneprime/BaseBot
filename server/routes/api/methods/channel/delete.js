module.exports = async (req, res, urlArray) => {
    let data = {}
    let channel = req.body;
    if(urlArray[2]) {
        channelDelete = client.channels.resolve(urlArray[2])
    } else {
        return res.end(`Undefined ID`)
    }
    if(!channelDelete) 
        return res.end(`Error`);
    channelDelete.delete('API REQUEST');
    res.status(200)
    return res.end(`Ok`)
};