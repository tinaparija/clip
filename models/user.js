var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Clip = require('./clip');

var UserSchema = new Schema({
  name: String,
  style: String,
  clips:[Clip.schema]
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
