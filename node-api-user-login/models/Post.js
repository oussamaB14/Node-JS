const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Types.ObjectId, ref: "User", required: true }, // this is a virtual field that references the User
  // title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);
