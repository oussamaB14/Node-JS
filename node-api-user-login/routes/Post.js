const express = require("express");
const router = express.Router();
const Post = require("./../models/Post");
const auth = require("./../middleware/auth");

//Create new post
router.post("/create", auth, async (req, res) => {
  if (!content || typeof content !== "string") {
    res.status(400).send({ error: "Invalid input" });
  }
  try {
    const { content } = req.body;
    const newPost = new Post({
      content,
      author: req.user._id,
    });
    await newPost.save();
  } catch (error) {
    console.error("Post Creation failed:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().populate("author");
    res.send(posts);
  } catch (error) {
    res.status(500).json({ message: "Error in fetching posts" });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = Post.findByIdAndUpdate(id, { content }, { new: true });
    res.send(send);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});
module.exports = router;
