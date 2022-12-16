const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VenueSchema = Schema({
    venueid: { type: Number, required: true, unique: true },
    venuee: String,
    latitude: Number,
    longitude: Number,
    // events: [{ type: Schema.Types.ObjectId, ref: 'Venue' }],
    events: [Number],
    comments: [{
        username: { type: Schema.Types.ObjectId, ref: 'User' },
        body: String,
        date: Date,
    }]
});

module.exports.update = async function (req, res) { }

const Venue = mongoose.model('Venue', VenueSchema);

module.exports.find = async function (req, res) {
    const e = req.body;
    const venue = await Venue.findOne({ venueid: e.venueid });
    if (venue)
        res.json(venue)
    else
        res.json({ err: `Venue ${e.venueid} not found` });
}

module.exports.create = async function (req, res) {
    const e = req.body;
    const venue = await Venue.findOne({ venueid: e.venueid });
    if (venue)
        return res.json({ err: "Venue already exists." });

    try {
        let venue = new Venue(e);
        venue.save();
    } catch (e) {
        return res.json({ err: e });
    }
    res.json({ msg: `Venue ${e.venueid} created.` });
}

module.exports.update = async function (req, res) {
    const e = req.body;
    try {
        let venue = await Venue.findOne({ venueid: e.venueid });
        if (!venue) {
            venue = new Venue(e);
            // venue.comments = [];
            venue.save();
        } else {
            venue.venueid = e.venueid;
            venue.venuee = e.venuee;
            venue.latitude = e.latitude;
            venue.longitude = e.longitude;
            venue.events = e.events;
            // no update to comment
            venue.save();
        }
    } catch (e) {
        return res.json({ err: e });
    }
    res.json({ msg: `Venue ${e.venueid} updated.` });
}