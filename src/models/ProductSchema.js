import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";

const env = dotenv.config().parsed;
/* Mongoose configuration vsc */

await mongoose
  .connect(env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected 🍕");
  });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
  console.log("CONNECTED");
});

/* Mongoose configuration vsc*/

const productsCollection = "Products";

const productsModel = new mongoose.Schema({
  title: { type: Schema.Types.String, require: true },
  stock: { type: Schema.Types.Number, require: true },
  code: { type: Schema.Types.String, require: true },
  price: { type: Schema.Types.Number, require: true },
});

/* third parameter is added to specify collection */
const productSchema = mongoose.model(productsCollection, productsModel, "Products");
/* third parameter is added to specify collection */

export default productSchema;
