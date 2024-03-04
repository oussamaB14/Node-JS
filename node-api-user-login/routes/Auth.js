const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

//Register new user
// router.post("/register", (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res
//       .status(400)
//       .json({ message: "Please Provide username and password" });
//   }
// });
//Register new User
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials!" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid Credentials!" });
    }
    //create token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", //token expiration time
    });
    //return json web token
    res.status(200).json({ token, userId: user._id, name: user.name });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = router;
