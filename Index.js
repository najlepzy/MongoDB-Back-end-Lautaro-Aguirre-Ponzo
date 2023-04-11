import express from "express";
import { Server } from "socket.io";
import ProductManager from "./src/ProductManager.js";
import connectionInstance from "./src/app.js";

const ProductsWebSocket = new Server(connectionInstance);
const productManager = new ProductManager("products.json");

ProductsWebSocket.on("connection", (client) => {
  client.on("create_product", (data) => {
    productManager.addProduct(data);
    client.emit("create_ok", {
      code: "OK",
      product: data,
    });
  });
  client.on("delete_product", (data) => {
    let deleted = productManager.deleteProduct(parseInt(data));
      client.emit("delete_ok", deleted);
  });
  client.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

export default ProductsWebSocket;
