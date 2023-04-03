import ProductManager from "./ProductManager.js";
import express from "express";
import cartEndPoint from "./cartEndPoint.js"

const port = 8081;

const productManager = new ProductManager("products.json");
const app = express();

app.use(express.json());

app.use("/api/carts", cartEndPoint);

app.get("/api/products", (request, response) => {
  let products = productManager.getProducts();
  let limit = request.query.limit;
  if (limit == null) return response.send(products);
  products = products.slice(0, limit);
  response.send(products);
});
app.post("/api/products", (request, response) => {
  // ! No validation.
  productManager.addProduct(request.body);
  response.send(
    JSON.stringify({
      code: "OK",
      product: request.body,
    })
  );
});

app.get("/api/products/:pid", (request, response) => {
  console.log(request.params);
  let id = productManager.getProductsById(parseInt(request.params.pid));
  console.log(id);
  response.send(id);
});

app.put("/api/products/:pid", (request, response) => {
  let update = productManager.updateProduct(
    parseInt(request.params.pid),
    request.body
  );
  response.send(update);
});
app.delete("/api/products/:pid", (request, response) => {
  let deleted = productManager.deleteProduct(parseInt(request.params.pid));
  response.send(deleted);
});

app.listen(port, () => {
  console.log(`Server is running on port 8081 ${port}`);
});
