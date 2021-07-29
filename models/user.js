var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');


const userSchema = new mongoose.Schema({
    email: {
        type:String,
        unique:true,
        sparse:true,
        validate(value){
            if(! validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        default: '',
    },
});



const User = mongoose.model('users',userSchema);
module.exports=User;

