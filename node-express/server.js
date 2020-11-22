const express = require('express');

// Serve static files with express.static and use Morgan middleware for logging
const morgan = require('morgan');

// import route modules
const campsiteRouter = require('./routes/campsiteRouter');
const promotionRouter = require('./routes/promotionRouter');
const partnerRouter = require('./routes/partnerRouter');

const hostname = 'localhost';
const port = 3000;

// returns an express server application that is avaiable under the var name app
const app = express(); 

// middleware
app.use(morgan('dev')); // adding Morgan middleware for logging
app.use(express.json()); // middleware that handles json data parsing

// routes (sorta like middleware)
// multiple routers can be set up as modules for easier use and cleaner code
// instead of defining routes in this file, move them to their respective .js files and reference them here via use(). 
app.use('/promotions', promotionRouter);
app.use('/partners', partnerRouter);
app.use('/campsites', campsiteRouter);

/* ----- Set up a REST API - (IGNORE - for reference. moved to campsiteRouter.js in a later exercise.)
    app.all('/campsites', (req, res, next) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      next();
    });

    app.get('/campsites', (req, res) => {
      res.end('Will send all the campsites to you');
    });

    app.post('/campsites', (req, res) => {
      res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
    });

    app.put('/campsites', (req, res) => {
      res.statusCode = 403;
      res.end('PUT operation not supported on /campsites');
    });

    app.delete('/campsites', (req, res) => {
      res.end('Deleting all campsites');
    });
    
    // route parameter allows us to store whatever client sends as a part of the path after the slash as a route param called 'campsiteId'
    app.get('/campsites/:campsiteId', (req, res) => {
      res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
    });

    // post request will not be supported on this path but we will handle the request with a response
    app.post('/campsites/:campsiteId', (req, res) => {
      res.statusCode = 403; // operation is not supported
      res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
    });

    // echo back what was sent from the json body's request message
    // send a multiline response and update the campsiteId
    app.put('/campsites/:campsiteId', (req, res) => {
      res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
      res.end(`Will update the campsite: ${req.body.name}
          with description: ${req.body.description}`);
    });

    app.delete('/campsites/:campsiteId', (req, res) => {
      res.end(`Deleting campsite: ${req.params.campsiteId}`);
    });
----- */


// set up express to serve files from the public folder
// __dirname will refer to the absolute path of the current containing directory 
app.use(express.static(__dirname + '/public'));

app.use((req, res) => { // use() takes a call back function that is a special middleware function that has access to req, res, and next
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    // notice that when the page requested is not present, request is sent to the express server. this is useful for 404 pages
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});