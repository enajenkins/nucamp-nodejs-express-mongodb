const express = require('express');

// Serve static files with express.static and use Morgan middleware for logging
const morgan = require('morgan');

const hostname = 'localhost';
const port = 3000;

const app = express(); // returns an express server application that is avaiable under the var name app

// adding Morgan middleware
app.use(morgan('dev'));

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