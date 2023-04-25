import mongoose, {Schema} from "mongoose";

const productsCollection = "Products";

const productsModel = new mongoose.Schema({
  title:{type: Schema.Types.String, require:true},
  stock:{type: Schema.Types.Number, require:true},
  code:{type: Schema.Types.String, require:true},
  price: { type: Schema.Types.Number, require: true },
  enable: { type: Schema.Types.Boolean, default: true },
});


const productSchema = mongoose.model(productsCollection, productsModel);

export default productSchema;