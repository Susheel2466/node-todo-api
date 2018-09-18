// const MongoClient = require('mongodb').MongoClient;
const {MongoClient ,ObjectID} = require('mongodb');
// const obj= new ObjectID();
// console.log(obj);


// var user ={name: 'susheel', age: 23}
// var {name} =user;
// console.log(name);


//Code for inserting data in mongo db


MongoClient.connect('mongodb://localhost:27017/TodoApp' ,(err,db) =>{
   if(err){
   	return console.log('Unable to connect to MongoDB server');
   }
   console.log('connected to MongoDB server');

   db.collection('Todos').insertOne({
   	   text: 'We will do it',
   	   completed:true
   } , (err, result) =>{
   	   if(err){
   	   	return console.log('Unable to insert todo' , err);
   	   }
   	   console.log(JSON.stringify(result.ops, undefined,2));
   });

   // db.collection('Users').insertOne({
   // 	   // id: 123,
   // 	   name: 'susheel' ,
   // 	   age: 23,
   // 	   location: 'New Delhi'
   // } , (err, result) =>{
   // 	   if(err){
   // 	   	return console.log('Unable to insert users' , err);
   // 	   }
   // 	   console.log(result.ops[0]._id.getTimestamp());
   // });

   db.close();
});