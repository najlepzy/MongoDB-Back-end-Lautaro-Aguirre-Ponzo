import { Schema } from "mongoose";
import mongoose from "../../core/Connection.js"

const productsCollection = "Products";

const productsModel = new mongoose.Schema({
  title: { type: Schema.Types.String, require: true, index:true },
  stock: { type: Schema.Types.Number, require: true },
  code: { type: Schema.Types.String, require: true },
  price: { type: Schema.Types.Number, require: true },
   type: { type: Schema.Types.String, require: true }

});

/* third parameter is added to specify collection */
const productSchema = mongoose.model(productsCollection, productsModel, "Products");
/* third parameter is added to specify collection */

export default productSchema;
