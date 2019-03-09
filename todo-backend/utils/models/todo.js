const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');
const _ = require('lodash');
const Schema = mongoose.Schema;
var TodoSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        unique:true,
        minlength:1,
        required:true,
        index: true
    },
    description:{
        type:String,
        minlength:8,
        required:true
    },
    createdOn:{
        type:Date,
        default:(new Date())
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

TodoSchema.methods.toJSON = function() {
    var todo = this ;
    var todoObject = uo.toObject();
    return _.pick(uoObject,['description','name','createdOn'])
}

module.exports = mongoose.model("Todo",TodoSchema);