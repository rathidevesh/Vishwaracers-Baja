const mongoose = require("mongoose");
const { Schema } = mongoose;

const TeamSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  insta:{
    type:String,
    required : true,
  },
  images: {
    type:[String]
  },
  domain :{
    type:String
  }
  
});

const Addteam = mongoose.model("team", TeamSchema);
module.exports = Addteam;