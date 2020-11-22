const express = require('express');
const campsiteRouter = express.Router();
// add use(bodyParser.json())

/* ------ Home Route ------*/
// any http request to this path will trigger the following methods
campsiteRouter.route('/')
// a catch all routing method for all http verbs. here we are setting default properties on the response object for all routing methods on the path
.all((req, res, next) => { 
    res.statusCode = 200; // success
    res.setHeader('Content-Type', 'text/plain'); // expect plain text
    next(); // pass control of app routing to next relevant routing method after this one
})
// sends plain text message body back to client
// defaults are already set in all() and next() is not needed because we will not process any more routing methods after this
.get((req, res) => {
    res.end('Will send all the campsites to you');
})
// after the server handles the callback for all(), it'll hit the next() function and go to the next relevant routing method. If the request was a POST request, it'll come here from .all()
// .post() carries the info in the body of the message - usually but not always n json
// express.json() middleware takes the properties from the json data recieved and automatically set them up as properties of the {req.body} js object
.post((req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
})
// reject the request to the endpoint
// ------- why is put used this way? --------
.put((req, res) => {
    res.statusCode = 403; // operation is not supported
    res.end('PUT operation not supported on /campsites'); // send message and exit
})
// removes endpoint
.delete((req, res) => {
    res.end('Deleting all campsites');
});


/* ------ Campsites Route Parameter ------*/
// end point for individual campsites
campsiteRouter.route('/:campsiteId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
// route parameter allows us to store whatever client sends as a part of the path after the slash as a route param called 'campsiteId'
.get((req, res) => {
    res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
})
// post request will not be supported on this path but we will handle the request with a response
.post((req, res) => {
    res.statusCode = 403; // operation is not supported
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
})
// echo back what was sent from the json body's request message
// send a multiline response and update the campsiteId
.put((req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite: ${req.body.name}
        with description: ${req.body.description}`);
})
.delete((req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
});

module.exports = campsiteRouter;