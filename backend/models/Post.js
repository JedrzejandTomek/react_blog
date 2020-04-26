const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now,
    }, 
    email: {
      type: String,
      required: true
    },
    postImage: {
      type: String,
      required: true
    }
  },
  {
    collection: "posts"
  }
);

module.exports = Post = mongoose.model("post", PostSchema);
