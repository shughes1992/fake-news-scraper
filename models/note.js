var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  title: String,
  body: String
});

// Export the Note model
module.exports = mongoose.model("Note", NoteSchema);
