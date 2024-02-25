const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Please enter a product name"] },
    quantity: { type: Number, required: true, default: 0 },
    //   description: { type: String, required: false },
    price: { type: Number, required: true },
    image: { type: String, required: false },
  },
  {
    //used to track when data is saved to the database , it provides two fileds (created and updated )
    timestamps: true,
  }
);

const product = mongoose.model("Product", productSchema);

module.exports = product;
