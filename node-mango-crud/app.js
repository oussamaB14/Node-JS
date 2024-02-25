const express = require("express");
const mongo = require("mongoose");
const app = express();
const Product = require("./Models/ProductModel");
app.use(express.json()); // parse requests of content-type - application/json
app.use(express.urlencoded({ extended: false }));
// connect to the database
const conect = mongo
  .connect(
    "mongodb+srv://oussamaboufari:29278690ob@cluster0.xgjmknz.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(3001, () => {
      console.log(`Node API app is running on port 3001`);
    });
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .send("Error occurred while creating product.")
      .json({ error: error.toString() });
  }
});

app.get("/products", async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "No products found." });
  }
});
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Product not Found!" });
  }
});
//update product
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (product == null) {
      return res.status(404).json({
        message: `The product with the given ID ${id} was not found.`,
      });
    } else {
      const uppdatedProduct = await Product.findById(id);
      res.status(200).json(uppdatedProduct);
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update the product" });
  }
});

// delete product
app.delete("/products/:id", async (req, res) => {
    try {
        const {id}= req.params
        const product =await Product.findByIdAndDelete(id)
        if (!product){
            return res.status(404).json({message:`The product with the id :${id} is not found.`})
            }else{
                res.status(200).json(product)
        }
        
    } catch (error) {
        res.status(500).json({ message: "Failed to delete the product" });
    }
});

