const express = require("express");
const router = express.Router();
const Post = require("./../models/Post");
const auth = require("./../middleware/auth");

//Create new post (requires authentification)
router.post("/", auth, async (req, res) => {
  try {
    // Create a new instance of the User model with data from req.body
    let post = await Post.create(req.body);
    // Send back the newly created user document in JSON format
    return res.json(post);
  } catch (e) {
    console.error(e);
    return res.status(400).send("Something went wrong!");
  }
});
router.post("/", auth, async (req, res) => {
  //validate input
  if (!content || typeof content !== "string") {
    res.status(400).send({ error: "Invalid input" });
  }
  try {
    const { content } = req.body;
    //create new post instance with user id from token
    const newPost = new Post({
      content,
      // author: req.tokenData.id,
      author: req.user._id,
    });
    //save it to database and send response
    //return newPost.save().then((post) => res.json(post));
  } catch (error) {
    console.error("Post Creation failed:", error);
    res.status(500).json({ message: "Server error" });
  }
});
