var models = require('../models');
var User = models.User; 
var Clip = models.Clip; 
var passport = require('passport');

function index(req, res) {
  User.find({}, function(err, users) {
    if (err) res.send(err);
    else res.json(users);
  });
}

function create(req, res) {
  console.log("creating")
  User.register(new User({email: req.body.email, name: req.body.name}), req.body.password,
    function (err, newUser) {
      console.log("registered")
        passport.authenticate('local')(req, res, function() {
        res.json(newUser);
      });
    }
  );
}

function login(req, res){
  res.json(req.user);
}

function logout(req, res) {
  console.log("BEFORE logout", JSON.stringify(req.user));
  req.logout();
  console.log("AFTER logout", JSON.stringify(req.user));
  res.send({logged_out: true})
}

function show(req, res) {
  User.findById(req.params.user_id, function(err, user) {
    res.json(user);
  });
}

function update(req, res) {
  User.findByIdAndUpdate(req.params.user_id,
      {$set: req.body}, {"new":true}, function(err, user){
      if (err) res.send(err);
      else {
        res.json(user);
      }
  });
}

function destroy(req, res) {
  User.findByIdAndRemove(req.params.user_id, function(err, user) {
      if (err) { console.log('error', err); }
      res.send(200);
    });
}

module.exports = {
  index: index,
  create: create,
  show: show,
  update: update,
  destroy: destroy,
  login: login, 
  logout: logout
};

