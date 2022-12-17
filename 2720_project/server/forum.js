const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ForumSchema = Schema({
    venueid: { type: Number, required: true, unique: true },
    comments: [{
        username: String,
        body: String,
        date: Date,
    }]
});

module.exports.update = async function (req, res) { }

const Forum = mongoose.model('Forum', ForumSchema);

module.exports.find = async function (req, res) {
    const e = req.body;
    const forum = await Forum.findOne({ venueid: e.venueid });
    if (forum)
        res.json({ comments: forum.comments })
    else
        res.json({ err: `Forum for venue ${e.venueid} not found` });
}

module.exports.create = async function (req, res) {
    const e = req.body;
    const forum = await Forum.findOne({ venueid: e.venueid });
    if (forum)
        return res.json({ err: `Forum for venue ${e.venueid} already exists.` });

    try {
        let forum = new Forum(e);
        forum.save();
    } catch (e) {
        return res.json({ err: e });
    }
    res.json({ msg: `Forum for venue ${e.venueid} created.` });
}

module.exports.update = async function (req, res) {
    const e = req.body;
    try {
        let forum = await Forum.findOne({ venueid: e.venueid });
        if (!forum) {
            forum = new Forum(e);
            forum.save();
        } else {
            forum.comments.push(...e.comments)
            venue.save();
        }
    } catch (e) {
        return res.json({ err: e });
    }
    res.json({ msg: `Venue ${e.venueid} updated.` });
}