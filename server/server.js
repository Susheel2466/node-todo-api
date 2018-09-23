require('./config/config');


const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
 
var app = express();
const port = process.env.PORT;

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

app.get('/todos', (req,res) =>{
   Todo.find().then((todos) =>{
   	  res.send({todos});
   }, (e) =>{
   	  res.status(400).send(e);
   });
});

app.get('/todos/:id', (req,res) =>{
	var id = req.params.id;

	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	Todo.findById(id).then((todo) =>{
		if(!todo){
			return res.status(404).send();
		}
		res.send({todo});
	}).catch((e) =>{
		res.status(400).send();
	});

});

app.delete('/todos/:id' , (req,res) =>{
	var id =req.params.id;

	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	Todo.findByIdAndRemove(id).then((todo) =>{
		if(!todo){
			return res.status(404).send();
		}
		res.send({todo});
	}).catch((e) =>{
		res.status(400).send();
	});

});

app.patch('/todos/:id', (req, res) =>{
	var id =req.params.id;
	var body = _.pick(req.body, ['text', 'completed']);

	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	if(_.isBoolean(body.completed) && body.completed){
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id,{$set: body}, {new :true}).then((todo) =>{
		if(!todo){
			return res.status(404).send();
		}

		res.send({todo});
	}).catch((e) =>{
		res.status(400).send();
	})
});




app.listen(port, ()=>{
	console.log(`Started up at port ${port}`);
});

module.exports={app};


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