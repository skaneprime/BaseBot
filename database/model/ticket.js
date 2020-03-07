let ticketSchema = new mongoose.Schema({
    _id: Number,
    channelID: Number,
    authorID: Number,
    type: String
});

module.exports = mongoose.model("tickets", ticketSchema);