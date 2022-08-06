const mongoose = require("mongoose");

const furnitureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product name must be provided"],
  },
  price: {
    type: Number,
    required: [true, "Product price must be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: `{VALUE} is not supported`,
    },
  },
  country: {
    type: String,
    enum: {
      values: ["Nigeria", "Ghana", "Mali", "Benin"],
      message: `{VALUE} is not supported`,
    },
  },
  points: {
    type: Number,
    default: 2,
  },
});

module.exports = mongoose.model("Furniture", furnitureSchema);
