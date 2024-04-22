const mongoose = require("mongoose");
const { Schema } = mongoose;

const CarSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cost: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  Used_for:{
    type:String
  }
});

const Addcar = mongoose.model("car", CarSchema);
module.exports = Addcar;