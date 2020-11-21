/* ------ 3. Exercise: Node HTTP Module

  * Implement a simple HTTP Server that can respond to server requests.  

 ------ */

const http = require('http');

const hostname = 'localhost';
const port = 3000;

/* ------ set up the server 

  * creates basic, minimal server using createServer() method which uses an existing http.server class 
  * it takes a request handler callback function as a parameter which is expressed below as an arrow function
  * the requst handler is called every time the server recieves a request and it takes two objects as parameters: req, res. 
  * we dont create the res object ourselves, rather we recieve it along with the incoming request and we add data to the response and send it back
  * req and res are special objects called streams which are transmitted in chunks of data that are read piece by piece. 
  * the res object stream can be passed in for you to use because it is already created at the same time the request is recieved.
------ */
const server = http.createServer((req, res) => { 
    // we have access to the headers via the request object
    console.log(req.headers);
    // add a status code property to the request object
    res.statusCode = 200;
    // set up a header and pass in 'Content-Type' with a value of 'text/html'
    // this setting tells the client what kind of data to expect in the response body
    // use this anytime you are using html in the response body
    res.setHeader('Content-Type', 'text/html');
    // close the response stream
    // when the response body is short, you can include it in the end() method as an arg
    res.end('<html><body><h1>Hello World!</h1></body></html>');
});

// to start the server, call the listen() method on the 'server' var that we defined. the first two params are the port and hostname vars we defined
// the last param is the callback function to use when the server starts
// use Postman to send test http requests to our server and to review the responses
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
