const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const BookSchema = Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  genre: String,
  author: String,
  read: Boolean,
});

module.exports = mongoose.model("Books", BookSchema, "Books");
