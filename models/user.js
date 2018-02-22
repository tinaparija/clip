var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Clip = require('./clip');

var UserSchema = new Schema({
  email: String, 
  name: String, 
  password: String, 
  clips:[Clip.schema]
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
