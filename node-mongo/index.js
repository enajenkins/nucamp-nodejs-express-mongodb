// the const acts as a client for the mongo server. it requires the mongodb-node driver and gets the MongoClient object from the driver
const MongoClient = require('mongodb').MongoClient;
// allows you to perform checks on values  
const assert = require('assert').strict;
// 
const dboper = require('./operations');

// set up a connection to the mongodb server
// use the custom protocol 'mongodb' and the port typically used by mongoDB
const url = 'mongodb://localhost:27017/';

// provide the name of the database you want to connect to
// const dbname = 'nucampsite';
const dbname = 'campsite'; // for some reason my database name ended up as 'campsite'

// to access the server, use the MongoClient.connect() method. connect() allows you to connect the MongoClient to the mongoDB server
// the first arg is the url, the second is an options object, the third a callback: connect(url[, options], callback)
// useUnifiedTopology is a recommended option setting that enables a major updates and rewrite of the topology layer of the mongo-node driver, eliminating warnings. it can be removed in later versions 
// the callback has an err object param and the client
// the client is used to connect to the database and perform operations
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

    // check to make sure the error is not null by checking and comparing values passed into the method
    // assert.strictEqual(actual value, expected value);
    // if the actual and expected match, continue - if not, assert fails, throws and error, terminates the entire application, and logs the error to the console. it's a shorthand for err===null ? put : continue
    assert.strictEqual(err, null);

    // check connection to mongodb database server
    console.log('Connected correctly to server');

    /* interact with the server through database operations */
    // declare a const named 'db' and use the client.db() method to connect to the database (on mongodb database server). pass in the name of the database you want to connect to. use this db object to access methods to interact with database
    const db = client.db(dbname);

/* ------ 3. Exercise: Node and MongoDB Part 2: Use the Node module for database operations ------ */

    // this is an example of 'Callback Hell'
    // each operation depends on the completion of the one before it
    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped Collection:', result);

        dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test"},
            'campsites', result => {
            console.log('Insert Document:', result.ops);

            dboper.findDocuments(db, 'campsites', docs => {
                console.log('Found Documents:', docs);

                dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" },
                    { description: "Updated Test Description" }, 'campsites',
                    result => {
                        console.log('Updated Document Count:', result.result.nModified);

                        dboper.findDocuments(db, 'campsites', docs => {
                            console.log('Found Documents:', docs);
                            
                            dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
                                'campsites', result => {
                                    console.log('Deleted Document Count:', result.deletedCount);

                                    client.close();
                                }
                            );
                        });
                    }
                );
            });
        });
    });

    /* ------ Callback Hell ------ 
      * can happen with nested callbacks
      * often called 'pyramid of doom'
      * It can be avoided by refactoring
      * it happens when we write code with a top down approach, expecting code to run from the top down, in order. using named functions rather than anonymous ones can help prevent callback hell. for example:
      * 
        instead of...
        setTimeout( () => { console.log('hello') }, 1000 );

        write...
        sayHello = () => console.log('hi');
        setTimeout(sayHello, 1000);
      
      * ES6 Promises will also help prevent callback hell. the promise acts as a proxy, or placeholder for a value which is unknown at the moment. the promise allows the code to continue to execute. if the value has an error, the promise is rejected with an error. if the value is valid, the promise is resolved and the value becomes available. when the promise is first created. it's in a 'poending' state before it is resolved or rejected. we can access the resolve value of a promise by using the .then() method. also. async() and await(). you can use the catch() method to catch errors. 

      http://callbackhell.com/
      https://colintoh.com/blog/staying-sane-with-asynchronous-programming-promises-and-generators
      https://medium.com/@js_tut/the-great-escape-from-callback-hell-3006fa2c82e
      https://learn.nucamp.co/mod/book/view.php?id=3233  
    */

});


/* ------ 2. Exercise: Node and MongoDB Part 1 (OLDER CODE FOR REFERENCE) ------ */
    /* --   delete everything already in the campsites collection - the   one on the database - NOTE: this is not typical. only doing this so as we test the app we are starting with a fresh blank collection each time to avoid problems 
      -- 'drop' === delete: db.dropCollection(name of collection, callback)*/
    // db.dropCollection('campsites', (err, result) => {

        /* -- check to make sure the value of err is null and if so, continue - that is, make sure no errors are being returned from the database
          -- log out out the result of the drop operation */
        // assert.strictEqual(err, null);
        // console.log('Dropped Collection', result); // true if successful

        /* -- assign the collection we want to access to a const for readability */
        // const collection = db.collection('campsites');

        /* ------ insert something into the campsites collection ------
          -- insert a document into the collection object via the insertOne() method
          
          -- insertOne() - inserts a single document into MongoDB. If documents passed in do not contain the _id field, one will be added to each of the documents missing it by the driver, mutating the document. This behavior can be overridden by setting the forceServerObjectId flag.
          
          -- syntax: insertOne(doc, options, callback) will return a {Promise}
          
          -- Inserts a single document into a collection and return the _id of the inserted document.
          
          -- The collection.insertOne() action returns a Promise that resolves to a document that describes the insert operation. */
        // collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"},
        // (err, result) => { // the callback takes two params, err and result (this is a convention)
            // check to see if any error has occurred
            // assert.strictEqual(err, null);
            // console.log('Insert Document:', result.ops); // 'ops' is a property short for operations. depending on the method, it contains different values. in this case, for the insertOne() method we are expecting an array with the doc that was inserted

            /*  -- list (print to the console) the documents in the collection
              -- to get find() to return all the methods, give it an empty param list
              -- chain toArray() to the result to convert the docs to an array of objects so we can console log it
              -- .toArray() is also from the mongodb-node driver and it takes the conventional error callback. */ 
            // collection.find().toArray((err, docs) => {
            //     assert.strictEqual(err, null);
            //     console.log('Found Documents:', docs);

                /*  immediately close the client connection the the mongodb server - exits */
//                 client.close();
//             });
//         });
//     });
// });

// note the series of nested callbacks. we are using callbacks this way because we are working with async operations. it takes time to communicate with a server and get a response back. we need to handle these operations

// run npms start from this folder and observe

