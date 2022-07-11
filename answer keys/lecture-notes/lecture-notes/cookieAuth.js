const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/lecture", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome!");
});

const auth = (req, res, next) => {
  if (req.cookies.username) {
    return next();
  }
  res.send("Unauthorized");
};

app.get("/secret", auth, (req, res) => {
  res.send("you accessed the member area");
});

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

app.post("/signup", (req, res) => {
  User.create(req.body)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post("/login", (req, res) => {
  User.findOne({ username: req.body.username }).then((user) => {
    if (user.password === req.body.password) {
      res.cookie("username", user.username);
      return res.json(user);
    }
    return res.send("not authorized");
  });
});

app.listen(3000);
