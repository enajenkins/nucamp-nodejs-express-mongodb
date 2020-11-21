/* ------ 3. Exercise: Node HTTP Module

  * Implement a simple HTTP Server that can respond to server requests.  

 ------ */

const http = require('http');

const hostname = 'localhost';
const port = 3000;

/* Part 2: Serve static HTML files using path and fs modules */
// add the ability for our server to serve static files stored in a directory:
const path = require('path');
const fs = require('fs');

/* ------ Part 1: Set up a basic server using http module 

  * creates basic, minimal server using createServer() method which uses an existing http.server class 
  * it takes a request handler callback function as a parameter which is expressed below as an arrow function
  * the requst handler is called every time the server recieves a request and it takes two objects as parameters: req, res. 
  * we dont create the res object ourselves, rather we recieve it along with the incoming request and we add data to the response and send it back
  * req and res are special objects called streams which are transmitted in chunks of data that are read piece by piece. 
  * the res object stream can be passed in for you to use because it is already created at the same time the request is recieved.
------ */
const server = http.createServer((req, res) => { 
    // we have access to the headers via the request object
    // console.log(req.headers);
    console.log(`Request for ${req.url} by method ${req.method}`);

/* Part 2: Serve static HTML files using path and fs modules */
    // write a conditional so the server only responds to requests with GET method
    // if it IS a GET request, examine the requested URL
    if (req.method === 'GET') {
        let fileUrl = req.url; // get contents of requst URL
        if (fileUrl === '/') { // if just hostname - localhost or root of site...
            fileUrl = '/index.html'; // ...set the fileUrl to the index page 
        }

        // convert the path from relative to absolute
        // concatenate the path string to the fileUrl we stored
        const filePath = path.resolve('./public' + fileUrl); 

        // get the extension so we can evaluate it 
        const fileExt = path.extname(filePath); 

        // we only want to serve static files, so if the file is an html file
        if (fileExt === '.html') {
            // can we access the file? Does it exist on the server?
            // like fs.exists <--deprecated
            // takes a file path and error callback arguments
            fs.access(filePath, err => {
                // use the common error handling convention here
                // if file is not present and 'err' is 'truthy'
                if (err) {
                    // add a status code property to the request object
                    res.statusCode = 404;

                    // set up a header and pass in 'Content-Type' with a value of 'text/html'
                    // this setting tells the client what kind of data to expect in the response body
                    // use this anytime you are using html in the response body
                    res.setHeader('Content-Type', 'text/html');

                    // close the response stream
                    // when the response body is short, you can include it in the end() method as an arg
                    res.end(`<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`);

                    // add a return statement so the code after this is not executed
                    return;
                }
                // if a file is present...
                res.statusCode = 200; // successsful response
                res.setHeader('Content-Type', 'text/html'); // expect html

                // fs.createReadStream(filePath) to send the html file
                // it reads contents of the file it's given in small chunks. it's similar to lazy loading in react. the pipe() method is available on node streams. it takes the object 'res' as an arg 
                // piping the data from one stream object to another 
                fs.createReadStream(filePath).pipe(res); 
            });
        } else { // if the file is not an html file...
            res.statusCode = 404;  // set response to 'Not Found'
            res.setHeader('Content-Type', 'text/html'); // be sure the client expects html
            res.end(`<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`);// add the short header body message indicating that the file type is not supported to the end response stream method for efficiency
        }
    } else { // if the request is not GET...
        res.statusCode = 404; // set response to 'Not Found'
        res.setHeader('Content-Type', 'text/html'); // be sure the client expects html
        res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`); // add the short header body message indicating that the request method is not supported to the end response stream method for efficiency
    }
});

// to start the server, call the listen() method on the 'server' var that we defined. the first two params are the port and hostname vars we defined
// the last param is the callback function to use when the server starts
// use Postman to send test http requests to our server and to review the responses
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
