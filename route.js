const {User,validate,resetpassword} = require('../test/user');
const mongoose = require('mongoose');
const express = require('express');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const router = express.Router();

router.get('/',async (req,res) => {
    console.log(req.body);
     User.find({},['email','role','phno']).then(data=>{
         res.status(200).send(data);
     }).catch(err => {
     res.status(400).send(err)
     console.log("Error occurred");
     });
});
// router.put('/',async (req,res) => {
//     const{error}=resetpassword(req.body);
//     if(error) return res.status(400).send(error.details[0].message);

    
// })

router.post('/',async (req,res) => {
    const{error}=validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    user = new User(_.pick(req.body,['email','password','role','phno']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    res.send(_.pick(user,['_id','email','role','phno']));
});
module.exports=router;