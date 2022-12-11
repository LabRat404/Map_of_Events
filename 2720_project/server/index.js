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

const User = mongoose.model("User");

app.post("/login-user", async (req, res) => {
    const { username, password } = req.body;
  
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ error: "User Not found" });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.username }, JWT_SECRET);
  
      if (res.status(201)) {
        return res.json({ status: "ok", data: token });
      } else {
        return res.json({ error: "error" });
      }
    }
    res.json({ status: "error", error: "Invalid Password" });
});

app.listen(5000, () => {
    console.log("Server Started");
});