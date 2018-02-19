var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ClipSchema = new Schema({
  concept: String,
  content: String,
});

var Clip = mongoose.model('Clip', ClipSchema);
module.exports = Clip;
