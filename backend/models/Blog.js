const mongoose = require("mongoose");
const { Schema } = mongoose;

const BlogSchema = new Schema({
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
  images: {
    type:[String]
  },
  date: {
    type: Date,
    default: Date.now,
  },
  
});

const Blog = mongoose.model("blog", BlogSchema);
module.exports = Blog;