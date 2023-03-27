import ProductManager from "./ProductManager.js";
import express from "express";

const port = 8081;

const productManager = new ProductManager("products.json");
const app = express();

app.get("/products", (request, response) => {
  let products = productManager.getProducts();
  let limit = request.query.limit;
  if (limit == null) return response.send(products);
  products = products.slice(0, limit);
  response.send(products);
});

app.get("/products/:pid", (request, response) => {
  let id = productManager.getProductsById(parseInt(request.params.pid));
  console.log(id);
  response.send(id);
});

app.listen(port, () => {
  console.log(`Server is running on port 8081 ${port}`);
});
