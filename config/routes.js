var express = require('express');
var router = express.Router();
var controllers = require('../controllers');
var passport = require ('passport'); 

//GET All USERS 
router.get('/api/users', controllers.users.index);

// CRUD FOR SINGLE USER PROFILE 
router.post('/api/users/', controllers.users.create);
router.post('/api/users/login', passport.authenticate('local'), controllers.users.login);
router.get('/api/users/logout', controllers.users.logout);
router.get('/api/users/:user_id', controllers.users.show);

router.put('/api/users/:user_id', controllers.users.update);
router.delete('/api/users/:user_id', controllers.users.destroy);

//GET CLIPS FOR FOR A SINGLE USER 
router.get('/api/users/:user_id/clips', controllers.userClips.index);
router.get('/api/users/:user_id/clips',controllers.userClips.top_word)

//CRUD FOR SINGLE CLIP USER CLIP  
router.post('/api/users/:user_id/clips', controllers.userClips.create);
router.get('/api/users/:user_id/clips/:clip_id', controllers.userClips.show);
router.put('/api/users/:user_id/clips/:clip_id', controllers.userClips.update);
router.delete('/api/users/:user_id/clips/:clip_id', controllers.userClips.destroy);

module.exports = router;