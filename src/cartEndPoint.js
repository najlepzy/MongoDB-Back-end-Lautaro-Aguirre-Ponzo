import express from "express";
import CartManager from "./cartManager.js";

const cartEndPoint = express.Router();
const cartManager = new CartManager("carts.json");

cartEndPoint.get("/", (request,response) => {
  response.send(cartManager.getCarts());
});
cartEndPoint.post("/", (request,response) => {
  response.send(cartManager.addCart());
});
cartEndPoint.post("/:cartId/products/:pid", (request, response) => {
  cartManager.addProductToCart(parseInt(request.params.cartId),request.params.pid)
  response.send(true);
});

export default cartEndPoint;
