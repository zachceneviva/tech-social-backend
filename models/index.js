const mongoose = require("mongoose");

const connectionString = "mongodb://localhost:27017/techonnection";
    // process.env.MONGODB_URI || "mongodb://localhost:27017/techonnection";


mongoose
    .connect(connectionString)
    .then(() => console.log("MongoDB successfully connected..."))
    .catch((err) => console.log(`MongoDB connection error: ${err}`));

module.exports = {
    Post: require("./Posts"),
    Comment: require("./Comments"),
    Group: require('./Groups'),
    User: require('./User'),
    Meetup: require('./Meetups'),
    Conversation: require('./Conversations'),
    Message: require('./Messages'),
};
