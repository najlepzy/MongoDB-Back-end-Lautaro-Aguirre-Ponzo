  import express from "express";
  import CartManager from "../../data/Dao/CartManager.js";

const cartRouter = express.Router();
const cartManager = new CartManager("data/carts.json");

cartRouter.get("/", async (req, res) => {
  res.send(await cartManager.getCarts());
});

cartRouter.post("/", async (req, res) => {
  res.send(await cartManager.addCart());
});

cartRouter.post("/:cid/products/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;

  const result = await cartManager.addProductToCart(cartId, productId);

  if (!result) {
    return res.status(500).json({ message: "Failed to add product to cart" });
  }

  res.send(true);
});

cartRouter.post("/:cid/purchase", async (req, res) => {
  const cartId = req.params.cid;

  const result = await cartManager.completePurchase(cartId);

  if (!result) {
    return res.status(500).json({ message: "Failed to complete purchase" });
  }

  res.status(200).json({ message: "Purchase completed", cart: result });
});

export default cartRouter;