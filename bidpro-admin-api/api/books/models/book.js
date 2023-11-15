const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  genre: String,
  author: String,
  read: Boolean,
});

module.exports = mongoose.model("Books", BookSchema, "Books");
