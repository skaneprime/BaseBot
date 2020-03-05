let serverSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    options: {
        tickets: {
            mode: Number,
            parentID: String,
            channelID: String,
            limit: Number,
            messageID: String,
            emojiIDS: Array
        }
    },
});

module.exports = mongoose.model("servers", serverSchema);