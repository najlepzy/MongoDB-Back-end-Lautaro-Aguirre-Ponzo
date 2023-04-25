import { Router } from "express";
import mongoose from "mongoose";
import productSchema from "../models/ProductSchema.js"

const modelRouter = Router();

/* Mongoose configuration vsc */
void (async () => {
  try {
    await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected 🍕");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
});
/* Mongoose configuration vsc*/
/* Endpoint */

modelRouter.get("/", async (request, response) => {
  try {
    let products = await productSchema.find();
    response.send({ result: "success", payload: products });
  } catch (error) {
    console.log("Cannot get products with mongoose:" + error);
  }
});
modelRouter.get("/id:", async (request, response) => {
  const { id } = request.params;
  const products = await productSchema.findOne({ _id: id });
  response.send({ status: "success", payload: result });
});

modelRouter.post("/", async (request, response) => {
  let { title, stock, code, price } = request.body;
  if (!title || !stock || !code || !price)
    return response.send({ status: "error", error: "Incomplete values" });
  let result = await productSchema.create(request.body);
  response.send({ status: "success", payload: result });
});

modelRouter.put("/:id", async (request, response) => {
  const { id } = request.params;
  const productsToReplace = await productSchema.updateOne({_id:id}, request.body);
  if (  
    !productsToReplace.title ||
    !productsToReplace.stock ||
    !productsToReplace.code ||
    !productsToReplace.price
  );
  return response.send({ status: "error", error: "Incomplete values" });
  let result = await productSchema.updateOne({ _id: id }, productsToReplace);
  response.send({ status: "success", payload: result });
});
modelRouter.delete("/:uid", async (request, response) => {
  let { id } = req.params;
  let result = await productSchema.deleteOne({ _id: id });
  res.send({ status: "success", payload: result });
});

export default modelRouter;
