import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String },
  description: { type: String },
  available: { type: Boolean },
  price: { type: Number },
  category: { type: String },
  designer: { type: String },
  condition: { type: String },
  dimensions: { type: Object },
  images: { type: Array },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
