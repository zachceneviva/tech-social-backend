const mongoose = require('mongoose');
const Schema = mongoose.Schema

const MeetupSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        text: true,
    },
    date: {
        type: Date,
        required: true,
    },
    photo: {
        type: String,
        default: "https://commonlook.com/wp-content/uploads/2019/05/tribe-related-events-placeholder.png"
    },
    address: {
        type: String,
        required: true,
        text: true,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    zip: {
        type: String,
    },
    description: {
        type: String,
        required: [true, "Please add a group description."] 
    },
    usersAttending: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    group: {
        type: mongoose.Types.ObjectId,
        ref: "Group"
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref:"User"
    },
}, {timestamps: true})

const Meetup = mongoose.model('Meetup', MeetupSchema)

module.exports = Meetup