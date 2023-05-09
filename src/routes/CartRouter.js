  import express from "express";
  import CartManager from "../Dao/CartManager.js";

  const cartEndPoint = express.Router();
  const cartManager = new CartManager("data/carts.json");

  cartEndPoint.get("/", async (request, response) => {
    response.send(await cartManager.getCarts());
  });
  cartEndPoint.post("/", async (request,response) => {
    response.send(cartManager.addCart());
  });
  cartEndPoint.post("/:cartId/products/:pid", async (request, response) => {
    cartManager.addProductToCart(request.params.pid, (request.params.cartId));
    response.send(true);
  });

  export default cartEndPoint;
