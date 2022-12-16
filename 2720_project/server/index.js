const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
app.use(express.urlencoded({ extended: false }));

const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";
const mongoUrl =
  "mongodb+srv://2720:2720password@2720project.vhyn50e.mongodb.net/test";

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

require("./user");
const event = require("./event");
const venue = require("./venue");

const User = mongoose.model("User");

app.post("/login-user", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.username }, JWT_SECRET);
    if (res.status(200)) {
      if (username == "admin") {
        return res.json({
          status: "ok",
          data: token,
          username: username,
          adminFlag: true
        });
      } else {
        return res.json({
          status: "ok",
          data: token,
          username: username,
          adminFlag: false
        });
      }
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
});

app.get("/getUsers", async (req, res) => {
  const user = await User.find({ "who": "user" })
  if (!user) {
    return res.json({ error: "No user found" });
  } else {
    return res.json(user);
  }
});

app.post("/addUsers", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    User.create({
      username: "user2",
      password: "1234",
      who: "user",
      __v: 0
    })
  } else {
    return res.json({ error: "User was created" });
  }
  res.json({ status: "error", error: "No users" });
});

app.put("/updateUsers", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    User.create({
      username: "user2",
      password: "1234",
      who: "user",
      __v: 0
    })
  } else {
    return res.json({ error: "User was created" });
  }
  res.json({ status: "error", error: "No users" });
});

app.delete("/deleteUsers", async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username });

  if (!user)
    res.json({ status: "error", error: "No users" });
});

app.post("/getEvent", async (req, res) => {
  return event.find(req, res);
})

app.post("/addEvent", async (req, res) => {
  return event.create(req, res);
})

app.put("/updateEvent", async (req, res) => {
    return event.update(req, res);
})

/* Only 10 venues are stored in DB */
app.get("/getAllVenues", async (req, res) => {
  return venue.findAll(req, res);
})

app.post("/getVenue", async (req, res) => {
  return venue.find(req, res);
})

app.post("/addVenue", async (req, res) => {
  return venue.create(req, res);
})

app.put("/updateVenue", async (req, res) => {
  return venue.update(req, res);
})


app.listen(3001, () => {
  console.log("Server Started");
});