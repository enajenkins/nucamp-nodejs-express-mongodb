var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const session = require('express-session');
// const FileStore = require('session-file-store')(session);
const passport = require('passport');
// const authenticate = require('./authenticate');
const config = require('./config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const campsiteRouter = require('./routes/campsiteRouter');
const promotionRouter = require('./routes/promotionRouter');
const partnerRouter = require('./routes/partnerRouter');
const uploadRouter = require('./routes/uploadRouter');
const favoriteRouter = require('./routes/favoriteRouter');


var app = express();


/* ------ 2. Exercise: REST API with Express, MongoDB, and Mongoose Part 1: Update the Express application ------ */

const mongoose = require('mongoose');

// connect to the nucampsite database on the MongoDB server
// const url = 'mongodb://localhost:27017/nucampsite';
// const url = 'mongodb://localhost:27017/nucampsite';
const url = config.mongoUrl;

// mongoose.connect() is a wrapper around the MongoDB node driver's connect method. it's similar to the way we connected before, but with added Mongoose functionality
// the first arg is the url, the second is an object with options settings. we are setting the options below to deal with some MDB driver deprecations
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// the connect method automatically returns a promise, therefore, you can chain promise methods like .then() and .catch() to it.
connect.then(() => console.log('Connected correctly to server'), 
    err => console.log(err)
);

// Secure traffic only
app.all('*', (req, res, next) => {
  if (req.secure) {
    return next();
  } else {
    console.log(`Redirecting to: https://${req.hostname}:${app.get('secPort')}${req.url}`);
    res.redirect(301, `https://${req.hostname}:${app.get('secPort')}${req.url}`);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use() specifies middleware as the callback function and mounts it ()
// middleware are applied in the order that they appear
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser('12345-67890-09876-54321'));
// app.use(session({
//   name: 'session-id',
//   secret: '12345-67890-09876-54321',
//   saveUninitialized: false,
//   resave: false,
//   store: new FileStore()
// }));



app.use(passport.initialize());
// app.use(passport.session());

/* ------ Week 3 - Authentication | 2. Exercise: Basic Authentication: 
    add authentication middleware here so users have to authenticate before accessing datat from the server
    * https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication
    * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/WWW-Authenticate
    * https://nodejs.org/api/buffer.html#buffer_class_method_buffer_from_array
    
    Buffer - Converting a Buffer into a string is typically referred to as encoding, and converting a string into a Buffer as decoding. Character encodings : 'utf8', 'utf16le', 'latin1', 'base64', 'hex', 'ascii', 'binary', 'ucs2'.
------ */
// custom middleware function. it must have the req and res objects as params. this is true of all Express middleware functions. next is optional but good practice

// function auth(req, res, next) {
//   if (!req.signedCookies.user) {
//       const authHeader = req.headers.authorization;
//       if (!authHeader) { // if authHeader is null, (no authentication info in the request means user has not put in a username and password yet )
//           const err = new Error('You are not authenticated!');
//           res.setHeader('WWW-Authenticate', 'Basic'); // set a response header that lets the client know that the server is requesting authentication and that the auth method is 'Basic'
//           err.status = 401; // standard code when creds are not provided
//           return next(err); // pass the error message to Express so it can handle sending the error message and authentication request back to the client.
//       }
// server will not only send the error message back, but it will now also challenge the client for credentials because we set the response header to request authentication. if the client responds to the challenge, the response comes back to the auth function and the process starts again.

// parse the auth header and validate the username and password.
  // you'll need to split the auth header that contains the word 'Basic', a space, then the username and password in a base-64 encoded string. Once the string is decoded, it will show the username and password seperated by a colon. for example... admin:password
  // you want to parse out the UN and PW out from the auth header string and place them in a new array where admin[0] and password[1]
  // put the array in a const named auth. use the Buffer global class from node (no need to require it) and use the static method from() to decode the UN and PW. The following code takes the auth header and extracts the UN and PW from it, putting them both in the auth array as the first and second items. 
//       const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
//       const user = auth[0]; // get the UN
//       const pass = auth[1]; // get the PW
//       if (user === 'admin' && pass === 'password') { // check to see if (hard coded for now) auth credentials match. if so (authorized) pass control to the next() middleware function
//           res.cookie('user', 'admin', {signed: true}); // 
//           return next(); // authorized
//       } else { // if not, challenge the client for auth creds, set error to 401, send off to Express error handler 
//           const err = new Error('You are not authenticated!');
//           res.setHeader('WWW-Authenticate', 'Basic');
//           err.status = 401;
//           return next(err);
//       }
//   } else {
//       if (req.signedCookies.user === 'admin') {
//           return next();
//       } else {
//           const err = new Error('You are not authenticated!');
//           err.status = 401;
//           return next(err);
//       }
//   }
// }

app.use('/', indexRouter);
app.use('/users', usersRouter);
/*
function auth(req, res, next) {
  console.log(req.session); // log header to see what's in it

  if (!req.session.user) {  
      // const authHeader = req.headers.authorization;
      // if (!authHeader) {
          const err = new Error('You are not authenticated!');
          // res.setHeader('WWW-Authenticate', 'Basic');
          err.status = 401;
          return next(err);
      // }

      // Base64 encoding. When creating a Buffer from a string, this encoding will also correctly accept "URL and Filename Safe Alphabet" as specified in RFC 4648, Section 5. Whitespace characters such as spaces, tabs, and new lines contained within the base64-encoded string are ignored.
      // create a buffer object from a string
      // 
      // const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
      // const user = auth[0];
      // const pass = auth[1];
      // if (user === 'admin' && pass === 'password') {
      //     req.session.user = 'admin';
      //     return next(); // authorized
      // } else {
      //     const err = new Error('You are not authenticated!');
      //     res.setHeader('WWW-Authenticate', 'Basic');
      //     err.status = 401;
      //     return next(err);
      // }
  } else {
      // if (req.session.user === 'admin') {
      if (req.session.user === 'authenticated') {
        return next();
      } else {
          const err = new Error('You are not authenticated!');
          err.status = 401;
          return next(err);
      }
  }
}
*/


// function auth(req, res, next) {
//   console.log(req.user);

//   if (!req.user) {
//       const err = new Error('You are not authenticated!');                    
//       err.status = 401;
//       return next(err);
//   } else {
//       return next();
//   }
// }

// app.use(auth);

/* adding authenitication here before static files are served */
app.use(express.static(path.join(__dirname, 'public')));

app.use('/campsites', campsiteRouter);
app.use('/promotions', promotionRouter);
app.use('/partners', partnerRouter);
app.use('/imageUpload', uploadRouter);
app.use("/favorites", favoriteRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// more info: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website
// https://www.npmjs.com/package/nodemon
