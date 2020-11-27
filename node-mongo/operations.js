/* ------ Implement a Node module of database operations  ------*/

// const assert = require('assert').strict;

/* ------ 5. Exercise: Callback Hell and Promises 

  http://callbackhell.com/
  https://medium.com/@js_tut/the-great-escape-from-callback-hell-3006fa2c82e

  * the mongoDB node driver natively supports promises. whenever you use a method in it's api without a callback, it will automatically return the return value as a promise

  * this is a 'non-blocking' feature of node so if we need something to run only after something has finished, we need to chain the next() method to override this non-blocking feature. 

  We will refactor all of the methods we originally wrote...
  1. delete all of the callback arguments - we won't need to pass them in anymore
  2. insertOne() from the mongodb node driver api supports promises so if we don't give it a callback, it will automatically provide the result in a promise
  3. since insertOne() will now return a promise, prepend the method with a return to pass the resulting promise as the value for the insertDocument() method


------*/

exports.insertDocument = (db, document, collection) => {
  const coll = db.collection(collection);
  return coll.insertOne(document);
};

exports.findDocuments = (db, collection) => {
  const coll = db.collection(collection);
  return coll.find({}).toArray();
};

exports.removeDocument = (db, document, collection) => {
  const coll = db.collection(collection);
  return coll.deleteOne(document);
};

exports.updateDocument = (db, document, update, collection) => {
  const coll = db.collection(collection);
  return coll.updateOne(document, { $set: update }, null);
};


/* ------ PREVIOUS CODE BEFORE REFACTOR 

exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.insertOne(document, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);
    });
};

exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);
    coll.find().toArray((err, docs) => {
        assert.strictEqual(err, null);
        callback(docs);
    });
};

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);
    });
};

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    coll.updateOne(document, { $set: update }, null, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);
    });
};

------ */