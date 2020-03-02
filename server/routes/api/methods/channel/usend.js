module.exports = async (req, res, urlArray) => {
    let data = req.body;
    if(urlArray[2]) {
        user = await client.users.resolve(urlArray[2])
    } else {
        return res.end(`Undefined channel ID`)
    }
    if(!user) 
        return res.end(`Undefined`);
    if(data['embed'])
        user.send(data['message'], data['embed']).then(result => res.json(result))
    else user.send(data['message']).then(result => res.json(result))
};