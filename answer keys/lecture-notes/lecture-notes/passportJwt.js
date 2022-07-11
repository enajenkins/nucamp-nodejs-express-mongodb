const express = require("express");
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/lecture", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(express.json());
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.get(
  "/secret",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(`Welcome ${req.user.username}!`);
  }
);

const userSchema = new mongoose.Schema({});
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret123";
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ _id: jwt_payload._id }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);

app.post("/signup", (req, res) => {
  User.register({ username: req.body.username }, req.body.password)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  const token = jwt.sign({ _id: req.user._id }, "secret123");
  res.json({ token });
});

app.listen(3000);
