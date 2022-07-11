const express = require("express");
const mongoose = require("mongoose");

const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/lecture", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome!");
});

const basicAuth = (req, res, next) => {
  const encoded = req.headers.authorization.split(" ")[1];
  const [username, password] = Buffer.from(encoded, "base64")
    .toString()
    .split(":");
  User.findOne({ username: username }).then((user) => {
    if (user.password === password) {
      return next();
    }
    return res.send("not authorized");
  });
};

app.get("/secret", basicAuth, (req, res) => {
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

app.listen(3000);
