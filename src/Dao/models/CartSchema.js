import { Schema } from "mongoose";
import mongoose from "../../core/Connection.js";

const cartCollection = "Carts";

const cartsModel = new mongoose.Schema({
  id: { type: Schema.Types.String, require: true },
  products: [
    {
      id: { type: Schema.Types.String, require: true },
      quantity: { type: Schema.Types.Number, require: true },
    },
  ],
});

/* third parameter is added to specify collection */
const cartSchema = mongoose.model(cartCollection, cartsModel, "Cart");
/* third parameter is added to specify collection */

export default cartSchema;
