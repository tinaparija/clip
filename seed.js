var db = require('./models');

var usersList = [
{
  name: 'Tina',
  email: 't@gmail.com',
  password: 'abc123'
}, 
{
  name: 'Shelby',
  email: 'shelby@whatever.com',
  password: 'abc123'
}, 
];

var clipsList = [{
  concept: 'new concept',
  content: 'A paragraph (from the Ancient Greek παράγραφος paragraphos, "to write beside" or "written beside") is a self-contained unit of a discourse in writing dealing with a particular point or idea. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.',
  date: new Date('January 21, 2018')
},{
  concept: 'new concept',
  content: 'A paragraph (from the Ancient Greek παράγραφος paragraphos, "to write beside" or "written beside") is a self-contained unit of a discourse in writing dealing with a particular point or idea. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.',
  date: new Date('January 28, 2018')
},{
  concept: 'new concept',
  content: 'A paragraph (from the Acient Greek παράγραφος paragraphos, "to write beside" or "written beside") is a self-contained unit of a discourse in writing dealing with a particular point or idea. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.',
  date: new Date('February 5, 2018 ')
},{
  concept: 'new concept',
  content: 'A paragraph (from the Ancient Greek παράγραφος paragraphos, "to write beside" or "written beside") is a self-contained unit of a discourse in writing dealing with a particular point or idea. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.',
  date: new Date('February 14, 2018')
},
{
  concept: 'new concept',
  content: 'A paragraph (from the Ancient Greek παράγραφος paragraphos, "to write beside" or "written beside") is a self-contained unit of a discourse in writing dealing with a particular point or idea. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.',
  date: new Date('February 14, 2018')
},
{
  concept: 'new concept',
  content: 'A paragraph (from the Ancient Greek παράγραφος paragraphos, "to write beside" or "written beside") is a self-contained unit of a discourse in writing dealing with a particular point or idea. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.',
  date: new Date('February 28, 2018')
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
