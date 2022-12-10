const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

//db connnection
mongoose.connect(); // put the connection string
const db = mongoose.connection;
db.once('open', function() {
    console.log("Connection is open...");
});

app.get('/*', (req, res) => res.send('Success'));
// enable cross origin
app.use(cors());

app.get('/login', (req, res) => {
    res.send({
        token: 'test123'
    });
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));