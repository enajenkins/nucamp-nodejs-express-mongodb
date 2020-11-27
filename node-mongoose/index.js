/* ------ 2a. Exercise: Mongoose ODM Part 1 - Implement a Node application 

  https://mongoosejs.com/
  https://mongoosejs.com/docs/deprecations.html
  https://code.tutsplus.com/articles/an-introduction-to-mongoose-for-mongodb-and-nodejs--cms-29527
  https://devcenter.heroku.com/articles/nodejs-mongoose

*/
const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

// connect to the nucampsite database on the MongoDB server
// const url = 'mongodb://localhost:27017/nucampsite';
const url = 'mongodb://localhost:27017/campsite';
// mongoose.connect() is a wrapper around the MongoDB node driver's connect method. it's similar to the way we connected before, but with added Mongoose functionality
// the first arg is the url, the second is an object with options settings. we are setting the options below to deal with some MDB driver deprecations
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// the connect method automatically returns a promise, therefore, you can chain promise methods like .then() and .catch() to it.
connect.then(() => {

    console.log('Connected correctly to server');

/* ------ 2b. Exercise: Mongoose ODM Part 1 - Implement a Node application 
    // instantiate a new document: const modelInstanceName = new Model({ obect to set documents fields });
    const newCampsite = new Campsite({
        name: 'React Lake Campground',
        description: 'test'
    });

    // save() is a mongoose method that will save the document to the database and return a promise indicating wether or not the save was successful
    // success resolves with the saved document
    // failure 
    newCampsite.save()
    .then(campsite => {
        console.log(campsite); // view saved campsite
        return Campsite.find(); // look for all docs based on this campsite model. return the result as a promise containing an array of the found documents
    })
    .then(campsites => { // take the array returned and log it
        console.log(campsites); 
        return Campsite.deleteMany(); // call on all documents that se the campsite model
    })
    .then(() => { // close the connection
        return mongoose.connection.close();
    })
    .catch(err => { // catch any errors for the promise chain. log them and close the connection
        console.log(err);
        mongoose.connection.close();
    });
------ */

/* ------ 3. Exercise: Mongoose ODM Parts 2 & 3 - Part 2: Mongoose operations ------ */
    // we are now using the create() method - which is available on the model. it takes an an object that defines the document  and automatically saves it, we can remove the save() method
    // create() also returns a promise that resolves to the new document. it will be the start of our new promise chain
    Campsite.create({ 
      name: 'React Lake Campground',
      description: 'test'
    })
    .then(campsite => {
      console.log(campsite);
      return Campsite.find();
    })
    .then(campsites => {
      console.log(campsites);
      return Campsite.deleteMany();
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .catch(err => {
      console.log(err);
      mongoose.connection.close();
    });
});



/* What we are doing with this promise chain in 2. Exercise: Mongoose ODM Part 1 

  1. create a new document based on the mongoos model
  2. save the document which will automatically save to the campsite collection
  3. console.log() the saved document 
  4. find and log all the docs instantiated form the model
  5.delete all the docs created from the model
  6. close the connection

  OUTPUT:

  Connected correctly to server
  {
    _id: 5fc14ea07c49db5f685765a9,
    name: 'React Lake Campground',
    description: 'test',
    createdAt: 2020-11-27T19:08:16.096Z,
    updatedAt: 2020-11-27T19:08:16.096Z,
    __v: 0
  }
  [
    {
      _id: 5fc14ea07c49db5f685765a9,
      name: 'React Lake Campground',
      description: 'test',
      createdAt: 2020-11-27T19:08:16.096Z,
      updatedAt: 2020-11-27T19:08:16.096Z,
      __v: 0
    }
  ]

  // __v: 0 is used by mongoos for internal versioning
*/