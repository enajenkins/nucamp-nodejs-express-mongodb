const express = require('express');

const hostname = 'localhost';
const port = 3000;

const app = express(); // returns an express server application that is avaiable under the var name app

app.use((req, res) => { // use() takes a call back function that is a special middleware function that has access to req, res, and next
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});