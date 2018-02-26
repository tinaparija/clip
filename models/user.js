var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose'),
    Schema = mongoose.Schema,
    Clip = require('./clip');

var UserSchema = new Schema({
  email: String, 
  name: String, 
  password: String, 
  clips:[Clip.schema],
  top_word: ''
});

UserSchema.plugin(passportLocalMongoose, {
	usernameField: "email",
	hashField: "password"
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
