const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');
const _ = require('lodash');
const Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        minlength:1,
        required:true,
        index: true
    },
    email_id:{
        type:String,
        unique:true,
        minlength:4,
        required:true
    },
    password:{
        type:String,
        minlength:8,
        required:true
    },
    name:{
        type:String,
        default:""
    },
    joinedOn:{
        type:Date,
        default:(new Date())

    }
});

  

UserSchema.methods.toJSON = function() {
    var user = this ;
    var userObject = user.toObject();
    return _.pick(userObject,['email_id','_id','name','joinedOn','username'])
}

UserSchema.statics.findByUsername=function(username,password,done){
    var User = this;
    User.findOne({'username':username},(err,user)=>{
        if(err){
            return done(err)
        }else if(!user){
            return done(null,null);
        }else{
            bcrypt.compare(password, user.password).then((res)=>{
                if(!res){
                    return done('WP',user);
                }else if(res){
                    return done(null,user);
                }
            }).catch((err)=>{
                return done(err);
            })
        }
    })
}

module.exports = mongoose.model("User",UserSchema);