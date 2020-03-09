let ticketSchema = new mongoose.Schema({ // Old.
    _id: Number,
    channelID: Number,
    authorID: Number,
    type: String
});

module.exports = mongoose.model("tickets", ticketSchema);