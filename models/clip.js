var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ClipSchema = new Schema({
  concept: String,
  content: String,
  date: {type: Date, default: Date.now}
});

var Clip = mongoose.model('Clip', ClipSchema);
module.exports = Clip;
