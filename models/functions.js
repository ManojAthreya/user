const userModel = require('./user');


const loginFunctions = {

    //Signup
     validateUser(user){
         const schema = {
           name:Joi.string().min(1).max(255).required(),
           username:Joi.string().min(1).max(255).required(),
           email:Joi.string().min(5).max(255).required().email(),
           password:Joi.string().min(5).max(255).required(),
           role:Joi.string().min(0).max(10),
           phno:Joi.string().min(10).max(10)
        };
        return Joi.validate(user,schema);     
    },

    //Signin
     validatePassword(req){
        const schema = {
          username:Joi.string().min(1).max(255).required(),
         password:Joi.string().min(5).max(255).required(),
         };
       return Joi.validate(req,schema);     
 },

    updateLogInCount: function(usr, callback) {
        let query = { username: usr };
        let inc = { $inc: { 'logcount': 1 } };
        userModel.update(query, inc, callback)
    },

    updateLastLogin: function(usr, callback) {
        console.log("in usr");
        let query = { username: usr };
        let last = { lastOnline: Date.now() };
        userModel.update(query, last, callback);
    },
    resetpassword:function(usr, newPwd, callback) {
        let query = { username: usr };
        let reset = { password: newPwd };
        userModel.update(query, reset, callback);
    }

};

module.exports = loginFunctions;