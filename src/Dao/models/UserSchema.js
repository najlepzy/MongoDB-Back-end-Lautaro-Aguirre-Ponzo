import { Schema } from "mongoose";
import mongoose from "../../core/Connection.js";
import mongoosePaginate from "mongoose-paginate-v2";

const userCollection = "Users";  

const userModel = new mongoose.Schema({
  userName: { type: Schema.Types.String, require: true, index:true },
  password: { type: Schema.Types.Number, require: true },
  email: { type: Schema.Types.String, require: true }
});

userModel.plugin(mongoosePaginate);

const options = {
  page: 1,
  limit: 5
};


/* third parameter is added to specify collection */
const userSchema = mongoose.model(userCollection, userModel, "users");
/* third parameter is added to specify collection */
export default userSchema;
