# Notes Node, MongoDB, and Express

* MongoDB is a database technology that uses JSON-like documents instead of Structured Query Language (SQL). It is newer and works well with NodeJS.

* Mongoose ODM (Object Data Modeling) library makes working together with Node and MongoDB easier.

* Node was created by Ryan Dahl in 2009. It took the Chrome V8 Javascript Engine and uses it to create a runtime environment for JS outside of the browser so it can be used for server-side applications. Before this, developers had to use a backend language on the server-side. 

* Node uses callbacks and an event loop for a 'non-blocking, asynchronous I/O model'

* NPM - Node Package Manager was created in 2010 and it allows javascript developers to package, version, and share their code through the NPM registry

## HTTP

* Postman provides a graphical user interface for sending test HTTP requests to a server.

## Node Modules

* Javascript was intended for browser scripting and now it's being used for writing full fledged applications

* JS was not designed with a set of standard libraries that access the underlying hardware and provide a structured way of taking pieces of code from multiple files and combining them together into a single app. Languages like C, C++, Java all have these common libraries.

* In 2009 CommonJS was created to fill this need. It defined a module format for breaking up a JS app into multiple files or 'modules'. Node and NPM was developed using the CommonJS format for working with modules. The entire Node and NPM ecosystem is built on top of CommonJS

* Node Modules can be in 3 formats:
  1. External, 3rd-Party: Installed into the node_modules folder using NPM.
  2. Core Modules: Built into Node and are intentionally minimal. Not managed by NPM. They include 'path', 'fs', 'OS', 'util', and a few others.
  3. File-Based Modules: They are created within our own application. They use 'module.exports' syntax to export code from JS files and they import into other files using Node's built-in 'require' function. It's similar to and basically performs the same function as ES6's 'import/export' concept which is also available in Node 8.5 and up. The 'require' function is standard, and while it is not a part of vanilla js, it is built into Node.

    exports.double = x => x * 2; // example.js
    const exampleModule = require('./example.js'); // imports whatever is being exported from test.js
    console.log(exampleModule.double(3)); // when you run the file in Node by typing "node test" you get 6

* NodeJS is organized into a 'single threaded event loop'. 
* While JS is single threaded, modern system kernels are multi threaded and can handle multiple parallel operations in the background
* Node event loop picks up requests as they come in and executes them one after another.  
* Whenever it needs to, it will offload I/O requests to the system kernel - the central program of the operating system. When it's finished, it lets node js know so it can put any associated callbacks in the queue. The callbacks are then executed by the event loop. The event loop is a continuously running loop that picks up requests form a queue and services them one at a time.
* Node JS is single threaded so it is only able to do one thing at a time, but it gets more things done by delagating time intensive work and using callbacks to pick up where it left off once the delagated work is completed

## Six phases of the Node Event Loop
1. Timer Phase **
2. Pending Callback Phase
3. Idle, Prepare Phase
4. Poll Phase ** where most of the action happens. processes the queue of callbacks and will wait for and process any new request and timers once the queue is empty
5. Check Phase ** - handles callbacks from setImmediate() timer function when the queue in the poll phase in empty
6. Close Callbacks Phase - emots the 'close' event if a socket or handle is closed abruptly

  ** you will primarily use these

## Notes from:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

* Node.js has had the ability to split JavaScript programs up into separate modules that can be imported when needed for a long time, and there are a number of JavaScript libraries and frameworks that enable module usage (for example, other CommonJS and AMD-based module systems like RequireJS, and more recently Webpack and Babel).

* modern browsers have started to support module functionality natively — browsers can optimize loading of modules, making it more efficient than having to use a library and do all of that extra client-side processing and extra round trips.

* Use of native JavaScript modules is dependent on the import and export statements.

* .mjs versus .js
  -- It is good for clarity, i.e. it makes it clear which files are modules, and which are regular JavaScript. It ensures that your module files are parsed as a module by runtimes such as Node.js, and build tools such as Babel.

  -- To get modules to work correctly in a browser, you need to make sure that your server is serving them with a Content-Type header that contains a JavaScript MIME type such as text/javascript. If you don't, you'll get a strict MIME type checking error along the lines of "The server responded with a non-JavaScript MIME type" and the browser won't run your JavaScript. Most servers already set the correct type for .js files, but not yet for .mjs files. Servers that already serve .mjs files correctly include GitHub Pages and http-server for Node.js.

  -- If you really value the clarity of using .mjs for modules versus using .js for "normal" JavaScript files, but don't want to run into the problem described above, you could always use .mjs during development and convert them to .js during your build step.

  -- Some tools may never support .mjs, such as TypeScript. The <script type="module"> attribute is used to denote when a module is being pointed to

  -- import 'commonjs-package/src/index.mjs';
// Loaded as ES module since .mjs is always loaded as ES module.



  ## Exporting and Importing
  
* You can export functions, var, let, const, classes
* You can use a single statement of comma separated items to export all the things you'd like to make available in a more efficient way: export { name, draw, reportArea, reportPerimeter };
* Once you've exported some features out of your module, you need to import them into your script to be able to use them. The simplest way to do this is as follows:
  import { name, draw, reportArea, reportPerimeter } from './modules/square.js';
* Note: In some module systems, you can omit the file extension and the leading /, ./, or ../ (e.g. 'modules/square'). This doesn't work in native JavaScript modules.



## Notes from: https://flaviocopes.com/commonjs/

* Modules let you encapsulate all sorts of functionality, and expose this functionality to other JavaScript files as libraries. 

* import syntax: 
  const package = require('module-name')
  // For example...
  exports.uppercase = (str) => str.toUpperCase() // uppercase.js
  const uppercaseModule = require('uppercase.js')
  uppercaseModule.uppercase('test')

## Notes from: https://www.freecodecamp.org/news/requiring-modules-in-node-js-everything-you-need-to-know-e7fbd119be8/

* You can think of the require module as the command and the module module as the organizer of all required modules. We rquire a file by loading the content of a file into memory.

* When Node invokes the require() function with a local file path as the function’s only argument, Node goes through the following sequence of steps:

  1. Resolving: To find the absolute path of the file. Node will look for the required module js file in all the paths specified by the module.paths in order.
  
  2. Loading: To determine the type of the file content.
  
  3. Wrapping: To give the file its private scope. This is what makes both the require and module objects local to every file we require.
  
  4. Evaluating: This is what the VM eventually does with the loaded code.
  
  5. Caching: So that when we require this file again, we don’t go over all the steps another time.

### The Module Object
  Module {
  id: 'usually the full path to the file', // every module object gets a property id
  exports: {},
  parent: undefined,
  filename: null,
  loaded: false,
  children: [],
  paths: [ ... ] }

So...
  Module {
  id: '.',
  exports: {},
  parent: null,
  filename: '/home/jim/Desktop/index.js',
  loaded: false,
  children: [],
  paths:
   [ '/home/jim/Desktop/node_modules',
     '/home/jim/node_modules',
     '/home/node_modules',
     '/node_modules' ] }

* Modules can also be folders with index.js files

## Notes from: https://www.sitepoint.com/understanding-module-exports-exports-node-js/

* Different Module Formats - the main ones:
  1. The Asynchronous Module Definition (AMD) format is used in browsers and uses a define function to define modules.

  2. The CommonJS (CJS) format is used in Node.js and uses require and module.exports to define dependencies and modules. The npm ecosystem is built upon this format.

  3. The ES Module (ESM) format. As of ES6 (ES2015), JavaScript supports a native module format. It uses an export keyword to export a module’s public API and an import keyword to import it.

  4. The System.register format was designed to support ES6 modules within ES5.

  5. The Universal Module Definition (UMD) format can be used both in the browser and in Node.js. It’s useful when a module needs to be imported by a number of different module loaders.

  More info: https://www.jvandemo.com/a-10-minute-primer-to-javascript-modules-module-formats-module-loaders-and-module-bundlers/ 

* requiring a module assigns the result to a variable. This is then used to invoke any method the module exposes.

* in CommonJS, modules are loaded synchronously and processed in the order they occur.

## Callback Functions, Higher Order Functions, and First-Class Fuctions
* First-Class Fuctions - functions tha are treated like any other variable. They can be assigned to variables, passed as arguments, and used as the return value of another function.

* Higher Order Functions - a function that passes in another function as an argument or returns another function as it's return value

* Callback Functions - a function that's passed to another function as an argument. A common example is asynchronous code. A callback is passed into the function and waits to execute until an async operation like a setTimeout or data fetching is complete. We need callbacks because javascript is an event driven language so rather than waiting for a response before moving on - it continues to execute while listening for other events. Callbacks are a way to make sure certain code doesn’t execute until other code has already finished execution.

Simply put: A callback is a function that is to be executed after another function has finished executing — hence the name ‘call back’.

For example, a setTimeout function is a higher order function that takes a callback function as it's first argument:

  setTimeout( () => callback function, timer interval );  
  setTimeout( () => console.log("This will execute after 2000ms"), 2000 );

Also...
  const myCallbackFn () => console.log("This will execute after 2000ms");
  setTimeout( myCallbackFn, 2000);


* Closure - an innner function that has accesss to it's closing scope. 
  const outerFn = () => {
    const x = 5;
    const innerFn = () => console.log(x);
    return innerFn; // 5
  }

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures...
  A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.

  When we say that JS is lexically scoped, what we mean is that a function will have access to the variables in the context of which it was defined not in which it is called 

  function init() {
    var name = 'Mozilla'; // name is a local variable created by init
    function displayName() { // displayName() is the inner function, a closure
      alert(name); // use variable declared in the parent function
    }
    displayName();
  }
  init();

  init() creates a local variable called name and a function called displayName(). The displayName() function is an inner function that is defined inside init() and is available only within the body of the init() function. Note that the displayName() function has no local variables of its own. However, since inner functions have access to the variables of outer functions, displayName() can access the variable name declared in the parent function, init().

  ** console.dir() will give you info on the function

## Notes from https://bytearcher.com/articles/io-vs-cpu-bound/
"What do the terms 'CPU bound' and 'I/O bound' mean?"
Bound implies performance bottleneck
Computation is said to be bound by something when that resource is the bottleneck for achieving performance increase. When trying to figure out if your program is CPU, memory or I/O-bound, you can think the following. By increasing which resource would your program perform better? Does increasing CPU performance increase the performance of your program? Memory, hard disk speed or network connection? All of these questions lead you to right to the source, of which resource your program is being held upon.

Express.js app is I/O bound. I/O-bound application waits most of the time for network, filesystem and database to complete. Increasing hard disk speed or network connection improves the overall performance. Node.js is best suited for this type of computing. All I/O in Node.js is non-blocking, and it allows other requests to be served while waiting for a particular read or write to complete.

CPU-bound
This kind of application leads to trouble in Node.js. If the application spends too much time performing a CPU-intensive task, all other requests are being held up. Node.js runs a single-threaded event loop to concurrently advance many computations, for example, serving multiple incoming HTTP requests. This works well as long as all event handlers are small and yet wait for more events themselves. But if you perform CPU intensive calculation, your concurrent web server Node.js application will come to a screeching halt. Other incoming requests will wait as only one request is being served at a time - not a very good service level.

There are strategies for coping with CPU intensive tasks. You can separate the calculation to elsewhere - forking a child process or using cluster module, using low level worker thread from libuv or creating a separate service. If you still want to do it in the main thread, the least you can do is give the execution back to the event loop frequently with nextTick(), setImmediate() or await.


### NOtes from https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/

The Node.js Event Loop, Timers, and process.nextTick()
What is the Event Loop?
The event loop is what allows Node.js to perform non-blocking I/O operations — despite the fact that JavaScript is single-threaded — by offloading operations to the system kernel whenever possible.

Event Loop Explained
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘


1. timers: this phase executes callbacks scheduled by setTimeout() and setInterval().

  A timer specifies the threshold after which a provided callback may be executed rather than the exact time a person wants it to be executed. Timers callbacks will run as early as they can be scheduled after the specified amount of time has passed; however, Operating System scheduling or the running of other callbacks may delay them.

  Note: Technically, the poll phase controls when timers are executed.

2. pending callbacks: executes I/O callbacks deferred to the next loop iteration.

  This phase executes callbacks for some system operations such as types of TCP errors. For example if a TCP socket receives ECONNREFUSED when attempting to connect, some *nix systems want to wait to report the error. This will be queued to execute in the pending callbacks phase.

3. idle, prepare: only used internally.

4. poll: retrieve new I/O events; execute I/O related callbacks (almost all with the exception of close callbacks, the ones scheduled by timers, and setImmediate()); node will block here when appropriate.

  The poll phase has two main functions:

  Calculating how long it should block and poll for I/O, then
  Processing events in the poll queue.
  When the event loop enters the poll phase and there are no timers scheduled, one of two things will happen:

  If the poll queue is not empty, the event loop will iterate through its queue of callbacks executing them synchronously until either the queue has been exhausted, or the system-dependent hard limit is reached.

  If the poll queue is empty, one of two more things will happen:

  If scripts have been scheduled by setImmediate(), the event loop will end the poll phase and continue to the check phase to execute those scheduled scripts.

  If scripts have not been scheduled by setImmediate(), the event loop will wait for callbacks to be added to the queue, then execute them immediately.

  Once the poll queue is empty the event loop will check for timers whose time thresholds have been reached. If one or more timers are ready, the event loop will wrap back to the timers phase to execute those timers' callbacks.

5. check: setImmediate() callbacks are invoked here.

  This phase allows a person to execute callbacks immediately after the poll phase has completed. If the poll phase becomes idle and scripts have been queued with setImmediate(), the event loop may continue to the check phase rather than waiting.

  setImmediate() is actually a special timer that runs in a separate phase of the event loop. It uses a libuv API that schedules callbacks to execute after the poll phase has completed.

  Generally, as the code is executed, the event loop will eventually hit the poll phase where it will wait for an incoming connection, request, etc. However, if a callback has been scheduled with setImmediate() and the poll phase becomes idle, it will end and continue to the check phase rather than waiting for poll events.

6. close callbacks: some close callbacks, e.g. socket.on('close', ...).

  If a socket or handle is closed abruptly (e.g. socket.destroy()), the 'close' event will be emitted in this phase. Otherwise it will be emitted via process.nextTick().

  setImmediate() vs setTimeout()
  setImmediate() and setTimeout() are similar, but behave in different ways depending on when they are called.

  setImmediate() is designed to execute a script once the current poll phase completes.
  setTimeout() schedules a script to be run after a minimum threshold in ms has elapsed.
  The order in which the timers are executed will vary depending on the context in which they are called. If both are called from within the main module, then timing will be bound by the performance of the process (which can be impacted by other applications running on the machine).


* process.nextTick()
Understanding process.nextTick()
You may have noticed that process.nextTick() was not displayed in the diagram, even though it's a part of the asynchronous API. This is because process.nextTick() is not technically part of the event loop. Instead, the nextTickQueue will be processed after the current operation is completed, regardless of the current phase of the event loop. Here, an operation is defined as a transition from the underlying C/C++ handler, and handling the JavaScript that needs to be executed.

Looking back at our diagram, any time you call process.nextTick() in a given phase, all callbacks passed to process.nextTick() will be resolved before the event loop continues. This can create some bad situations because it allows you to "starve" your I/O by making recursive process.nextTick() calls, which prevents the event loop from reaching the poll phase.


Also see: https://developer.ibm.com/tutorials/learn-nodejs-the-event-loop/



## Using ES6 Modules in Node
* The official standard for packaging up javascript code for reuse is 'ECMAScript Modules' By default, experimental support for ES Modules is enabled in Node even though CommonJS is default - but with limited interoperability with CommonJS.

One of the ways to use ES Modules in Node is to use the .mjs extension for ES6 module files. Files with this extension will be interpreted as ES Modules even if the type field in the nearest package.json file (located in the same folder or any parent folder) is set to "commonjs". This value determines how the build tools and loaders are interpreted. If "type" is set to "module", the build tools and loaders will interpret files with a .js extension as ES Modules. This "module" setting also applies to files referenced in import statements and import() expressions.





The official standard for packaging up pieces javascript code for reuse is 'ECMAScript Modules'. By default, experimental support for ES Modules is enabled in Node - but with limited interoperability with CommonJS.

One of the ways to use ES Modules in Node is to add the .mjs extension to js files with ES Module syntax. The "type" value determines how the build tools and loaders are interpreted. If "type" is set to "module", the build tools and loaders will interpret files with a .js extension as ES Modules. Files with this extension will be interpreted as ES Modules even if the type field in the nearest package.json file (located in the same folder or any parent folder) is set to "commonjs". This "module" setting also applies to files referenced in import statements and import() expressions. 

## HTTP and Networking
More info:
https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview
https://www.codecademy.com/articles/http-requests
https://www.lifewire.com/definition-of-protocol-network-817949
https://www.plixer.com/blog/network-layers-explained/



* Backend of web apps are typically hosted in the cloud by services like AWS, Heroku, Digital Ocean, Azure, etc

* When your web app communicates with the server, there may be delays or errors. Your front end needs to be able to handles these errors and delays, and communicate to the user.

* Networking Protocols - a set of rules that determine how two networked systems will talk to each other...
  -- What kind of data will be exchanged?
  -- How will the data be formatted?
  -- How will the systems respond to certain types of requests?

* Different types of protocols (TCP, UDP, FTP, SMTP) operate at differnt network layers from the physical layer to the application layer.

* HTTP (Hyper Text Transfer Protocol) is an application layer protocol. It is a foundation of data communication on the web. Every time you load a new webpage into the browser from the web:
  1. browser sends request to the server via 'HTTP request'. it doesn't go directly to the server - it takes a complicated route to get there - but if it is successful, it arrives at the correct server...
  2. then that server processes the request and responds to the request via 'HTTP response'


### HTTP Request 
* Always supplies an HTTP method or (HTTP Action) - 'GET/PUT/POST/DELETE'
* HTTP Protocol Version: typically 'HTTP/1.1'
* URL target
* Headers that provide more data about the request (optional): Host, Accept-Language
* Body that contains data for the request. (if it exists) POST will have this

### HTTP Response
* HTTP Status code https://httpstatuses.com/
* HTTP Protocol bversion
* Headers: Date, Server, Last-Modified, Etag, Accept-Ranges, Content-Length, Content-type
* Body

#### Status Codes
1. 1×× Informational
  * 100 Continue
  * 101 Switching Protocols
  * 102 Processing
2. 2×× Success
  * 200 OK
  * 201 Created
  * 202 Accepted
  * 203 Non-authoritative Information
  * 204 No Content
  * 205 Reset Content
  * 206 Partial Content
  * 207 Multi-Status
  * 208 Already Reported
  * 226 IM Used
3. 3×× Redirection
  * 300 Multiple Choices
  * 301 Moved Permanently
  * 302 Found
  * 303 See Other
  * 304 Not Modified
  * 305 Use Proxy
  * 307 Temporary Redirect
  * 308 Permanent Redirect
4. 4×× Client Error
  * 400 Bad Request
  * 401 Unauthorized
  * 402 Payment Required
  * 403 Forbidden
  * 404 Not Found
  * 405 Method Not Allowed
  * 406 Not Acceptable
  * 407 Proxy Authentication Required
  * 408 Request Timeout
  * 409 Conflict
  * 410 Gone
  * 411 Length Required
  * 412 Precondition Failed
  * 413 Payload Too Large
  * 414 Request-URI Too Long
  * 415 Unsupported Media Type
  * 416 Requested Range Not Satisfiable
  * 417 Expectation Failed
  * 418 I'm a teapot
  * 421 Misdirected Request
  * 422 Unprocessable Entity
  * 423 Locked
  * 424 Failed Dependency
  * 426 Upgrade Required
  * 428 Precondition Required
  * 429 Too Many Requests
  * 431 Request Header Fields Too Large
  * 444 Connection Closed Without Response
  * 451 Unavailable For Legal Reasons
  * 499 Client Closed Request
5. 5×× Server Error
  * 500 Internal Server Error
  * 501 Not Implemented
  * 502 Bad Gateway
  * 503 Service Unavailable
  * 504 Gateway Timeout
  * 505 HTTP Version Not Supported
  * 506 Variant Also Negotiates
  * 507 Insufficient Storage
  * 508 Loop Detected
  * 510 Not Extended
  * 511 Network Authentication Required
  * 599 Network Connect Timeout Error

### Transferring Data: XML vs JSON
More info:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON
https://developer.mozilla.org/en-US/docs/Web/XML/XML_introduction

* static sites: every new page makes HTTP requests to server for all assets
* SPA: most assets and files are dowloaded in beginning in one dowloand and the client requests the data for the current view when it changes. Two mosy common ways text data if formatted: XML and JSON

* JSON is encoded specifically to be transferred over networks and is easy for javascript apps and databases to parse. It's used by RESTful web services. Double quotes are mandatory.

* XML is similar to HTML but is not meant to be read by a browser. It's for storing and transferring data and it's typically used by the SOAP protocol

* SOAP


* REST


## Node HTTP Module
* There is a core HTTP Module built into Node that upi must require in order to use: const http = require('http');

* This module provides an http.createServer() method which creates a new instance of the http.Server class. It is passed a callback function parameter that handles the requests. The callback is sometimes called the request handler or the request listener and it listens to requests and the callback is called every time there is a new server request.

* the server.listen() method listens for requests on the port name or host name you give it. 

* the http module request handler callback has two parameters: request and response (req, res). these objects contain information about the request from the client and the response that will be sent back to the client

* 'req' object contains info about the request like method, url, headers, status, etc

* 'res' object is given information for the response like header, status code. etc... and we do not create this our selves. it is generated

* set a message for the response body using the res.write(); method and make sure to use the res.end() method to finish. it signals to the server that all of the response headers and body has been sent and the message is complete. You can also omit the write() method and include the message as an argument in the end() method

### Path snd FS core modules
More Info:
https://www.w3schools.com/nodejs/nodejs_http.asp
https://nodejs.org/api/http.html
https://anasshekhamis.com/2017/10/09/handling-http-requests-using-the-http-module/
http://zetcode.com/javascript/http/

* Path provides a utility for working with files and directory paths on the server.
  -- path.extname() returna file extension from given file
  -- path.resolve() converts relative path to absolute

* FS provides utilities for interacting with local file system of the server
  -- fs.access() checks whether a file can be accessed
  -- fs.createReadStream() reads from a file in small chunks of data instead of loading the entire file into memory