var mongoose = require("mongoose");

mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/clip_fe", {useMongoClient: true});

mongoose.Promise = global.Promise;  // use native Promise

module.exports.User = require("./user");
module.exports.Clip = require("./clip");
