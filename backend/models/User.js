const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    is_verified: { 
        type: Boolean,
        default: false
    },
    otp:{
        type : Number
    },
    occupation:{
        type:String,
        
    }
  });
  const User = mongoose.model('user', UserSchema);
  module.exports = User;