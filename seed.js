var db = require('./models');

var usersList = [
{
  name: 'Tina',
  style: 'Personal'
}, 
{
  name: 'Shelby',
  style: 'Journalism'
}, 
];


var clipsList = [{
  concept: 'life change',
  content: 'This is the content.'
},{
  concept: 'new topic',
  content: 'seed this fucking data.'
},
]

usersList.forEach(function(user) {
  user.clips = clipsList;
});

db.User.remove({}, function(err, users){
  // code in here runs after all albums are removed
  db.User.create(usersList, function(err, users){
    // code in here runs after all albums are created
    if (err) { return console.log('ERROR', err); }
    console.log("all users:", users);
    process.exit();
  });
});
