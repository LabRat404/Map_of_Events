const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = Schema({
    eventid: { type: Number, required: true, unique: true },
    titlee: String,
    // venueid: { type: Schema.Types.ObjectId, ref: 'Venue' },
    venueid: Number,
    desce: String,
    presenterorge: String,
    pricee: String,
});

const Event = mongoose.model('Event', EventSchema);

module.exports.find = async function (req, res) { }

module.exports.create = async function (req, res) {
    const e = req.body;
    const event = await Event.findOne({eventid: e.eventid});
    if (event) 
        return res.json({err: "Event already exists."});

    try {
        let event = new Event(e);
        event.save();
    } catch (e) {
        return res.json({ err: e });
    }
    res.json({ msg: `Event ${e.eventid} created.` });
}

module.exports.update = async function (req, res) {
    const e = req.body;
    try {
        let event = await Event.findOne({ eventid: e.eventid });
        if (!event) {
            event = new Event(e);
            event.save();
        } else {
            event.titlee = e.titlee;
            event.venueid = e.venueid;
            event.desce = e.desce;
            event.presenterorge = e.presenterorge;
            event.pricee = e.pricee;
            event.save();
        }
    } catch (e) {
        return res.json({ err: e });
    }
    res.json({ msg: `Event ${e.eventid} updated.` });
}