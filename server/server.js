var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
 
var app = express();

app.use(bodyParser.json());

app.post('/todos' , (req, res) =>{
   var todo = new Todo({
   	text: req.body.text
   });

   todo.save().then((docs) =>{
   	res.send(docs);
   }, (e) =>{
   	res.send(e);
   });
}); 

app.listen(3000, ()=>{
	console.log('Started on port 3000');
});

// var newTodo = new Todo({
// 	text: 'Cook dinner'
// });

// newTodo.save().then((docs) =>{
// 	console.log('Saved Todo' , docs);
// }, (e) =>{
// 	console.log('Unable to save Todo');
// });

// var otherTodo = new Todo({
// 	text: 'feed the cat',
// 	completed: true,
// 	completedAt: 123
// });

// var otherTodo = new Todo({
// 	text: '  Edit this video   '
// });

// var users = new User({
// 	email: '  susheel@fectory.in   '
// });


// otherTodo.save().then((docs) =>{
// 	console.log(JSON.stringify(docs, undefined, 2));
// }, (e) =>{
// 	console.log('Unable to save' , e);
// });

// users.save().then((docs) =>{
// 	console.log(JSON.stringify(docs, undefined, 2));
// }, (e) =>{
// 	console.log('Unable to save users' , e);
// });