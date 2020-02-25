let userScheme = new mongoose.Schema({
    username: String,
    userID: Number,
    permLevel: Number
});

module.exports = mongoose.model("users", userScheme);