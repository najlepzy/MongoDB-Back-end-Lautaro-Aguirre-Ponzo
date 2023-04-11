import express from "express";
import ProductManager from "./ProductManager.js";

const ProductViews = express.Router();
const productManager = new ProductManager("products.json");

ProductViews.get("/", (request, response) => {
  let products = productManager.getProducts();
  response.render("Home", { products: products, WindowTitle: "Products" });
});

export default ProductViews;
