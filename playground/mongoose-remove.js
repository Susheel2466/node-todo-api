const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) =>{
// 	console.log(result);
// });

Todo.findOneAndRemove({_id: '5ba75cd42afb24b4d61d7029'}).then((todo)=>{
	console.log(todo);
});

// Todo.findByIdAndRemove('5ba75cd42afb24b4d61d7029').then((todo) =>{
// 	console.log(todo);
// });