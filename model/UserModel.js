const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min: 2
    },
    email:{
        type:String,
        required:true
    }, 
    password:{
        type:String,
        required:true,
        min: 6
    },
    date:{
        type:Date,
        default:Date.now
    },
    score:{
        type:Number,
        default:0
    }
});

module.exports = mongoose.model('User', userSchema);