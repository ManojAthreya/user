const {User,validate,validateP,updateP,update} = require('../models/user');
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const router = express.Router();

router.get('/api/register',async (req,res) => {
    console.log(req.body);
     User.find({},['email','role','phno']).then(data=>{
         res.status(200).send(data);
     }).catch(err => {
     res.status(400).send(err)
     console.log("Error occurred");
     });
});

router.post('/api/register',async (req,res) => {
    const{error}=validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

      let user = await User.findOne({email:req.body.email});
      if(user) return res.status(400).send('User already registered');

    user = new User(_.pick(req.body,['username','name','email','password','role','phno']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.send('USER REGISTERED');
});

router.post('/api/login',async (req,res) => {
    const{error}=validateP(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({username:req.body.username})
    if(!user) return res.status(400).send('Invalid email or password')

   const validPassword = await bcrypt.compare(req.body.password, user.password)
   if(!validPassword) return res.status(400).send('Invalid email or password')
   res.send('Login Successfull');
   update(user);
}); 

router.post('/api/getuser', (req, res) => {
    User.findOne({ email: req.body.email }).then(data => {
        if (data) {
            res.send([data.email, data.phno, data.role])
        }
        else {
            res.send("Invalid user")
        }
    });
});

router.put('/api/login/:id', async (req,res) => {
    const{error}=updateP(req.body);
    if(error) return res.status(400).send(error.details[0].message);

  let User = await User.findByIdAndUpdate(req.params.id, {username:req.body.username},{new:true})
  .then(data => {
  if(User) { res.send('Changes Updated');
  } else {
           res.send('The User Id not found');
  }
});
});

module.exports=router;