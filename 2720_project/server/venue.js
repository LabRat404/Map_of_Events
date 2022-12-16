const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VenueSchema = Schema({
    veneuid: { type: Number, required: true, unique: true },
    venuee: String,
    longitude: Number,
    latitude: Number,
    events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    comments: [{ 
        username: { type: Schema.Types.ObjectId, ref: 'User' }, 
        body: String,
        date: Date,
    }]
});

module.exports.find = async function (req, res) {}

module.exports.create = async function (req, res) {}

module.exports.update = async function (req, res) {}
