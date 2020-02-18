let servers = new mongoose.Schema({
    name: String,
    id: Number,
    ownerID: Number,
    ownerUsername: String 
});

module.exports = mongoose.model("servers", servers);