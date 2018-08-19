const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt')

//Schema of User
 const User = mongoose.model('User',new mongoose.Schema({
     name:String,
     username:String,
     email:{
         type:String,
         required:true,
         minlength:5,
         maxlength:255,
         unique:true
     },
     password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:1024
     },
     role:String,
     phno:{
         type:Number,
         minlength:10,
         maxlength:10
     },
       lastOnline:{type:Date,default:Date.now()},
        logcount:{type:Number,default:0}
 }));

 //Signup
function validateUser(user){
   const schema = {
      name:Joi.string().min(1).max(255).required(),
          username:Joi.string().min(1).max(255).required(),
         email:Joi.string().min(5).max(255).required().email(),
         password:Joi.string().min(5).max(255).required(),
         role:Joi.string().min(0).max(10),
         phno:Joi.string().min(10).max(10)
       };
       return Joi.validate(user,schema);     
   }
  
//Signin
function validatePassword(req){
   const schema = {
      username:Joi.string().min(1).max(255).required(),
      password:Joi.string().min(5).max(255).required(),
   };
   return Joi.validate(req,schema);     
}

function updatePassword(user){
  const schema = {
      password:Joi.string().min(5).max(255).required()
   }
     return Joi.validate(user,schema);     
 }
 
 function updateLastLogin(user)
 {
   let query = {username: user};
   let last = {lastOnline: Date.now()};
   user.update(query, last);
 }
 
 const last = () => {
   var query = {
     username: req.user.username
   };
   var update = {
     lastOnline: Date.now()
   };
   var options = {
     new: true
   };
   user.findOneAndUpdate(query, update, options, function (err, user) {
     if (err) {
       console.log('error');
     }
   });
   return Joi.validate(user,last);  
 };


 //exporting model
exports.User = User;
exports.validate = validateUser;
exports.validateP = validatePassword;
exports.updateP = updatePassword;
exports.update = updateLastLogin;


