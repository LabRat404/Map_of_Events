const express = require('express');
const User = require("./user");
const bcryptjs = require('bcryptjs');
const authRouter = express.Router();

// authRouter.get("/test", (req, res) => {
//     res.json({
//         test: "this is the testing api"
//     });
// });

authRouter.post("/api/login", async(req, res) => {
    try {
        const {name, password} = req.body;
        const user = await User.findOne( {name} );
        if (!user) {
            return res.status(400).json({
                msg: "No user found!"
            });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json( {
                msg: "incorrect password!"
            });
        }

        const token = jwt.sign({id: user._id}, "passwordKey"); //private key
        res.json({token, ...user._doc});
        // {
        //     'token': 'abcd'
        //     'name': 'doria',
        // }
    } catch (e) {
        res.status(500).json( {
                error: e.message
            }
        );
    }
});

authRouter.post("/api/register", async (req, res) => {
    try {
        const {name, password} = req.body;
        
        const existingUser = await User.findOne({ name });
        if (existingUser) {
            return res
                .status(400)
                .json({ msg: 'User with same name already exists!' });
        }
        const hashedPassword = await bcryptjs.hash(password, 8);

        let user = new User({ //save to MongoDB
            name,
            password: hashedPassword,
        })
        user = await user.save();
        res.json(user);

        // 200 OK
        // get the data from client, 
        // post that data in db
        // return that data to the user
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = authRouter;