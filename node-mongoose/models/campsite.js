/* Define Mongoose Model */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* ------ 3. Exercise: Mongoose ODM Parts 2 & 3 - Part 3: Add subdocuments to a document ------ */
const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {
  timestamps: true
});

/* ------ 2. Exercise: Mongoose ODM Part 1 ------ */

// instantiate a new Schema object
// first arg is required. it's an object that contains the schema definition using properties
const campsiteSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    comments: [commentSchema] 
}, {
    // second optional argument use to set other config options
    // timestamps creates createdAt and updatedAt properties
    timestamps: true
});

// create a Model using the Schema
// the mongoose.model() returns a constructor function - the function ES6 classes are syntactic sugar for
// the Model is used to instantiate documents
const Campsite = mongoose.model('Campsite', campsiteSchema);

module.exports = Campsite;