### Optional: Robo 3T
What is Robo 3T?

Robo 3T is a third party application that provides a free, lightweight graphical interface for MongoDB. It can make viewing and interacting with MongoDB easier than using the Mongo REPL shell.
Using Robo 3T is optional. It is not used in the exercise videos for this course, and your instructors are not expected to support you in its usage. However, you are welcome to download it and try it for yourself, and to ask questions about it in Slack. 
Note: The download link leads to a page that has two downloads, Studio 3T and Robo 3T. Choose the Robo 3T option.

Basic usage instructions
If your mongoDB server is not started already, you will need to start it. Open a bash shell session to the mongodb folder you created in the previous exercise and enter the command:
mongod --dbpath=data
Download and install Robo 3T. 
Open Robo 3T. This should automatically open to the MongoDB Connections dialog. If it does not, go to File > Connections. Click Create a new connection. You should then see this Connection Settings dialog:


Leave all settings at their default values except the Name, which you will probably want to change to something more descriptive such as nucampsiteDB. 
Go to the Advanced tab and in the field for Default Database, enter the full path to the mongodb/data folder you created in the previous exercise. 
For Windows users, this will typically look like this: 
```C:\Users\<your username>\Desktop\NucampFolder\5-NodeJS-Express-MongoDB\mongodb\data```
For macOS users, this will typically look like this: 
```/Users/<your username>/Desktop/NucampFolder/5-NodeJS-Express-MongoDB/mongodb/data```
Click Save, then Connect. If you are unable to connect, make sure that you have started your mongoDB server in a bash shell session. 
To the left, you should now see a panel that looks like this:


Click the word nucampsite at the bottom. This is the nucampsite db you created in the previous exercise via the Mongo REPL shell (by using the command use nucampsite, which switches to an existing database by that name if there is one, or creates a new database by that name if there isn't one). 
Double click the word Collection, and you should see that it has a campsites collection.
Double click the campsites collection, and you should see the campsite document that you inserted in the previous exercise:

Let's delete and re-insert this document for practice's sake. Right click on the document (or control-click if you do not have a right mouse button). Choose Delete Document:


Right click again, either inside the panel from where you just deleted the document, or on the word campsites in the left-hand panel. Either way, you should now see an option to Insert Document. 
Choose this, and in the panel that next appears, enter the same document that you inserted in the previous exercise using the Mongo REPL shell:


You should now see that a document with this name and description appear in the campsites collection. 
Throughout your course, most of the manipulation of your database (inserting, deleting, etc) will occur programmatically, through Node applications you will build in future exercises. However, the Robo 3T GUI will allow you to quickly view what's in your collections and documents, which can be very helpful for debugging. 

### MongoDB Node.js Driver Documentation - https://mongodb.github.io/node-mongodb-native/3.4/

* the MongoDB Node.js Driver supports both callback-based and promise-based interactions with MongoDB Server

* Start the MongoDB server if it is not already running
You started the MongoDB server in the Introduction to MongoDB exercise. If it is still running, skip to the next section.
If you have closed it since then, you will need to start it again: Open a bash terminal to the 5-NodeJS-Express-MongoDB/mongodb folder and run this command:
mongod --dbpath=data
Make sure that you are in the mongodb folder when you run this command. Leave the server running in this bash terminal. 


Install the Node MongoDB driver module 
From inside the course folder (5-NodeJS-Express-MongoDB), create a new subfolder named node-mongo and open this folder in VS Code.
Create a package.json file in the node-mongo folder and add the below content into it. 
{
  "name": "node-mongo",
  "version": "1.0.0",
  "description": "Node MongoDB Example",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index"
  }
}
Optional: If you wish to use nodemon with this project, update the start script above to use nodemon instead of node. Don't forget to turn off AutoSave in VS Code and save manually if you use nodemon. 
From a bash terminal open to the node-mongo folder, install the Node MongoDB driver:
npm install mongodb@3.6.2


A simple Node-MongoDB application 
Create a new file named index.js inside the node-mongo folder and add the following code to it:
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

    assert.strictEqual(err, null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);

    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped Collection', result);

        const collection = db.collection('campsites');

        collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"},
        (err, result) => {
            assert.strictEqual(err, null);
            console.log('Insert Document:', result.ops);

            collection.find().toArray((err, docs) => {
                assert.strictEqual(err, null);
                console.log('Found Documents:', docs);

                client.close();
            });
        });
    });
});
Make sure your MongoDB server is up and running. 
Then, in a separate bash terminal that is open to the 5-NodeJS-Express-MongoDB/node-mongo directory, use npm start to run the Node-MongoDB application you created in this exercise, and observe the results. 
Optional: Add a .gitignore file that excludes the node_modules folder from Git in the project folder. Initialize the Git repository, and add and commit the project files with the message "Node MongoDB Example 1". 

    Connected correctly to server
    Dropped Collection true
    Insert Document: [
      {
        name: 'Breadcrumb Trail Campground',
        description: 'Test',
        _id: 5fc04fa4d5704e67f0e5eff2
      }
    ]
    Found Documents: [
      {
        _id: 5fc04fa4d5704e67f0e5eff2,
        name: 'Breadcrumb Trail Campground',
        description: 'Test'
      }
    ]
