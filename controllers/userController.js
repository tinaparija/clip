var models = require('../models');
var User = models.User; 
var Clip = models.Clip; 


function index(req, res) {
	User.find({}, function(err, users) {
		if (err) res.send(err);
		else res.json(users);
	});
}

function create(req, res) {
	User.create(req.body, function(err, user) {
		if (err) { console.log('error', err); }
    res.json(user);
  });
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
        find_match(user);
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
  destroy: destroy
};
