const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/Auth");
const postRoute = require("./routes/Post");
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use("/auth", authRoute);
app.use("/posts", postRoute);

app.get("/", (req, res) => {
  res.send({ message: "Welcome to the blog API" });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDb");
    app.listen(PORT, () => {
      console.log(`server listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erroor connecting to mongodb:", err.message);
  });
