const db = require('../models');

const index = async (req, res) => {
    try {
        const meetups = await db.Meetup.find({group: null}).sort({date: 1});
        if (!meetups) return res.json({message: "No meetups found."})
        return res.status(200).json({meetups})

    } catch (err) {
        console.log(err);
        res.error = err
    }
}

// Home banner
const homeBanner = async (req, res) => {
    try {
        const meetups = await db.Meetup.find({}).sort({date: 1}).limit(5);
        if (!meetups) return res.json({message: "No meetups found."})
        return res.status(200).json({meetups})

    } catch (err) {
        console.log(err);
        res.error = err
    }
}

// Group Meetups
const groupMeetups = async (req, res) => {
    try {
        const meetups = await db.Meetup.find({group: req.params.id}).sort({date: 1}).limit(5);
        if (!meetups) return res.json({message: "No meetups found."})
        return res.status(200).json({meetups})

    } catch (err) {
        console.log(err);
        res.error = err
    }
}

//Profile Meetups
const meetupsAttending = async (req, res) => {
    try {
        const meetups = await db.Meetup.find({usersAttending: {$in: req.params.id}}).sort({date: 1}).limit(5);
        if (!meetups) return res.json({message: "No meetups found."})
        return res.status(200).json({meetups})

    } catch (err) {
        console.log(err);
        res.error = err
    }
}

const create = async (req, res) => {
    
    try {
        let photo;
        if(req?.file) {
            photo = req.file.location
        } else {
            photo = 'https://techonnect.s3.us-east-2.amazonaws.com/default-meetup.webp'
        }
        const newMeetup = {...req.body, photo: photo, group: req.body.group || null}
        const meetup = await db.Meetup.create(newMeetup)
        console.log(meetup)
        return res.status(201).json({meetup})
    } catch (err) {
        console.log(err)
    }
}

const show = async (req, res) => {
    try {
        const foundMeetup = await db.Meetup.findById(req.params.id).populate({path: "creator", select: 'avatar firstName lastName city state'})
        console.log(foundMeetup)
        return res.status(200).json({
            meetup: foundMeetup,
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "An error occured. Please try again."
        })
    }
}

const update = async (req, res) => {
    try {
        const updateMeetup = await db.Meetup.findByIdAndUpdate(req.params.id, {...req.body}, {new:true})
            
        return res.status(200).json(updateMeetup)
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "An error occured. Please try again."
        })
    }
}

const destroy = async (req, res) => {
    try {
        await db.Meetup.findByIdAndDelete(req.params.id)
        
        console.log("Meetup deleted")
        return res.status(200)
    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    index,
    create,
    update,
    destroy,
    show,
    homeBanner,
    groupMeetups,
    meetupsAttending
}