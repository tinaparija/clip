/****************
 * REQUIREMENTS *
 ****************/
var express = require('express');
var app = express();
var router = require('./config/routes.js');
var db = require("./models"),
    User = db.User;
require('dotenv').config()

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.REACT_APP_FRONTEND_URL);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

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
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(router);


/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 8080, function () {
  console.log('Express server is up and running on http://localhost:8080/');
});
