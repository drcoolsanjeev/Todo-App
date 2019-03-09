const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const VerifyToken = require('./../utils/verifyToken');
const User = require('../utils/models/user'); 

const router = express.Router();

router.post('/signup',(req,res)=>{
    const body = _.pick(req.body,['username','email_id','name','password','joinedOn']);
    body.joinedOn= (new Date).toLocaleString();
    User.findOne({'username':body.username,'email_id':body.email_id},function(err,user){
        if(err){
            res.send(err)
        }else if(user){
            res.json({
                'success':false,
                'msg':'User with Username Exists'
            })
        }else{
            var user = new User(body);
            bcrypt.hash(user.password, 10).then(function(hash) {
                user.password=hash;
                user.save().then((user) => {
                    var token = jwt.sign({ username: user.username},'secret', {
                        expiresIn: 86400 // expires in 24 hours
                      });
                      res.status(200).json({
                        'success':true,
                        'msg':'Registration successful , Now you can Login'
                    })
                  }, (e) => {
                    res.json({
                        'success':false,
                        'msg':e
                    })
                  })
                
            }).catch((e)=>{
                res.json({
                    'success':false,
                    'msg':e
                })
            });
        }
    }); 
});

router.post('/signin',(req,res)=>{
    const body = _.pick(req.body,['username','email_id','password']);
    console.log(`*${body.password} * ${body.username}`);
    
    User.findByUsername(body.username,body.password,(err,user)=>{
        if(err){
            console.log(err)
            res.json({
                'success':false,
                'msg':err
            })
        }else if(!user){
            res.json({
                'success':false,
                'msg':'User not found'
            })
        }else if(user.isAdmin===true){
            let token = jwt.sign({ username: user.username, isAdmin: user.isAdmin },'secret', {
                expiresIn: 86400 // expires in 24 hours
              });
            res.json({
                'success':true,
                'msg':'Successfully logged In',
                'token': token,
                'user': {
                    username: user.username,
                    isAdmin:user.isAdmin
                  }
            }) 
        }
        else if(user){
            let token = jwt.sign({ username: user.username },'secret', {
                expiresIn: 86400 // expires in 24 hours
              });
            res.json({
                'success':true,
                'msg':'Successfully logged In',
                'token': token,
                'user': {
                    username: user.username,
                    isAdmin: user.isAdmin
                  }
            })
        }
    });
});

router.get('/profile', VerifyToken, (req,res,next)=> {
    User.findOne({username:req.username}, function (err, user) {
        if (err) return res.status(500).json({
            'success': false,
            'msg' : 'Authentication Error'
        });
        if (!user) return res.json({
            'success': false,
            'msg': 'User not found'
        });
        res.status(200).json({
            'success':true,
            'msg':user
        });
      });
}) 

router.patch('/:username/edit', VerifyToken, (req,res)=>{
    let username = req.params.username;
    
    const body = _.pick(req.body,['name','joinedOn']);
    
    User.findOne({'username':username}).then((model) => {
        return Object.assign(model, body);
    }).then((model) => {
        return model.save();
    }).then((updatedModel) => {
        res.json({
            'success':true, 
            'msg':'Profile updated Successfully!'
        })
    }).catch((err) => {
        res.json({
            'success':false,
            'msg':'User Not Found :('
        })
    });
});

module.exports = router;     