const mongoose = require('mongoose');
// set user model

const userSchema = mongoose.Schema({
    name: {
        required: true,
        type: String, 
        trim: true,
    },
    password: {
        required: true,
        type: String,
        validate: {
            validator: (value) => {
                return value.length > 6;
            },
            message: 'Please enter a valid password',
        }
    },
    type: {
        type: String,
        default: 'user',
    }
});
const User = mongoose.model("User", userSchema);
module.exports = User; // allow public access