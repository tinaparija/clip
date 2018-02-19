var models = require('../models');
var User = models.User; 
var Clip = models.Clip; 


function index(req, res) {
  User.findById(req.params.id, function(err, user){
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json(user.clips);
    });
}

function create(req, res) {
	clip = Clip.create(req.body, function(err, user) {
		if (err) { console.log('error', err); }
    res.json(user);
  	});

  let user_id = req.params.user_id;
  	User.findById(user_id, function (err, foundUser) {
    if (err) {console.log('error', err)};
    foundUser.clips.push(clips);
    foundUser.save();
    res.json(foundUser);
  })
}


function show(req, res) {
    Clip.findById(req.params.clip_id, function(err, clip) {
		res.json(clip);
	});
}

function update(req, res) {
  console.log("hello!");
}

function destroy(req, res) {
  var user_id = req.params.user_id;
  var clip_id = req.params.clip_id;

  User.findOne({_id:user_id}, function (err, foundUser){
    if(err){console.log(error, err);}

    var foundClip = foundUser.clips.id(clip_id);
    foundClip.remove();

    foundUser.save(function(err, saved){
      if(err) {console.log('error', err);}
      res.json(saved);
    });
  });
}


module.exports = {
  index: index,
  create: create,
  show: show,
  update: update,
  destroy: destroy 
};
