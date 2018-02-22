var models = require('../models');
var User = models.User; 
var Clip = models.Clip; 


function index(req, res) {
  User.findById(req.params.user_id, function(err, user){
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json(user.clips);
    });
}

function create(req, res) {
	Clip.create(req.body, function(err, clip) {
		if (err) { console.log('error', err); }
    
    let user_id = req.params.user_id;
    User.findById(user_id, function (err, foundUser) {
      if (err) {console.log('error', err)};
      foundUser.clips.push(clip);
      foundUser.save();
      res.json(foundUser);
    })
  });

}

function show(req, res) {
  var user_id = req.params.user_id;
  var clip_id = req.params.clip_id;

  User.findOne({_id: user_id}, function (err, foundUser){
    if(err){console.log(error, err);}
    var foundClip = foundUser.clips.id(clip_id);
    res.json(foundClip);
  })
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
