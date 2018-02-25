/****************
 * REQUIREMENTS *
 ****************/
var express = require('express');
var app = express();
var router = require('./config/routes.js');
var db = require("./models"),
    Post = db.Post,
    User = db.User;

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(router);

// middleware for auth
app.use(cookieParser());
app.use(session({
  secret: 'dismysecret', 
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 8080, function () {
  console.log('Express server is up and running on http://localhost:8080/');
});
