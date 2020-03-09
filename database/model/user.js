let userScheme = new mongoose.Schema({ // Old.
    username: String,
    userID: Number,
    permLevel: Number
});

module.exports = mongoose.model("users", userScheme);