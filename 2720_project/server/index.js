//IMPORT FROM PACKAGES
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
console.log("hello server");

//IMPORT FROM OTHER FILES
const authRouter = require('./auth');

//INIT
const PORT = 3000;
const app = express();
const DB = "mongodb+srv://2720:2720password@2720project.vhyn50e.mongodb.net/test";

//middleware
app.use(express.json());
app.use(authRouter);
app.use(cors());

mongoose
    .connect(DB)
    .then(() => {
        console.log("Connected to MongoDB successfully");
    })
    .catch((e) => {
        console.log("Error: " + e);
    })

app.listen(PORT, "0.0.0.0", () => {
    console.log(`connected at PORT ${PORT}`);
}) 
//localhost, 127.0.0.1