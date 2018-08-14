const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt')

//Schema of User
 const User = mongoose.model('User',new mongoose.Schema({
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
       tokens:{
        token:String,
         tokenStart:Boolean,
         tokenExp:Date         
     },
       lastOnline:{type:Date,default:Date.now()},
        logcount:Number,
         resetpassword:{
           otp:Number,
           status:Boolean,
          expiry:Date
        }
 }));
 function validateUser(user){
     const schema = {
         email:Joi.string().min(5).max(255).required()||Joi.string().min(5).max(255).required().email,
         password:Joi.string().min(5).max(255).required(),
         role:Joi.string().min(0).max(10),
         phno:Joi.string().min(10).max(10)
     };
     return Joi.validate(user,schema);     
 }

function updateCallbacks(err, numAffected)
{
if(err)
  {
    console.log("Error");
  }
else {
    console.log("password reset succesfull");
  }
}
function resetpassword(usr, pwd)
{
let query = {email:email};
let reset = {password:password};
userModel.update(query, reset, updateCallbacks);
}

 //exporting model
exports.User = User;
exports.validate = validateUser;
exports.resetpassword = resetpassword;

