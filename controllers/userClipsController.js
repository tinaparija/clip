var models = require('../models');
var User = models.User; 
var Clip = models.Clip; 


function index(req, res) {
  User.findById(req.params.user_id, function(err, user){
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json({clips:user.clips, top_word: top_word(user)});
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


function top_word(savedUser){
  let wordCounts = {};
  let content_holder = [];
  let clips = savedUser.clips;
  for (let i = 0; i < clips.length; i++){
    content_holder.push(clips[i].content)
  }  

  let combined = content_holder.join();
  let text_cleaned = combined.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"']/g,"");
  let text_lowercased = text_cleaned.toLowerCase();
  let individualized_words = text_lowercased.split(/\b/)

  for(var i = 0; i < individualized_words.length; i++) {
      wordCounts["_" + individualized_words[i]] = (wordCounts["_" + individualized_words[i]] || 0) + 1;
  }

  let badwords = {
    _the: true, 
    _be: true,
    _to: true,
    _of: true, 
    _and: true,
    _a: true,
    _in: true,
    _that: true,
    _have: true,
    _i: true,
    _it: true, 
    _for: true,
    _not: true,
    _on: true, 
    _with: true, 
    _he: true, 
    _as: true, 
    _you: true, 
    _do: true, 
    _at: true, 
    _this: true, 
    _but: true, 
    _his: true, 
    _by: true, 
    _from: true, 
    _they: true, 
    _we: true, 
    _say: true, 
    _her: true, 
    _she: true, 
    _or: true, 
    _an: true, 
    _will: true, 
    _my: true, 
    _one: true, 
    _all: true, 
    _would: true, 
    _there: true, 
    _their: true, 
    _what: true, 
    _so: true, 
    _up: true, 
    _out: true,
    _if: true, 
  }

  let topword1_name = '';
  let topword1_value = 0;

  for (let property in wordCounts) {
    if (!badwords[property] && property != "_ "){
      if (wordCounts[property] > topword1_value) {
        topword1_name = property; 
        topword1_value = wordCounts[property];
      }
    }
  }

  topword1_name_final = topword1_name.substr(1);
  return (topword1_name_final)
}

module.exports = {
  index: index,
  create: create,
  show: show,
  update: update,
  destroy: destroy,
  top_word: top_word
};
