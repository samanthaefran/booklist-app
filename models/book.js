// require dependencies
const mongoose = require("mongoose")
// shortcut variable
const Schema = mongoose.Schema;

// define the schema
const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  completed: Boolean,
}, {timestamps: true});

const Book = mongoose.model("Book", bookSchema)

module.exports = Book