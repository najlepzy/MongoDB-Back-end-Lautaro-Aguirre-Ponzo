import express from "express";
import cartEndPoint from "./CartEndPoint.js"
import ProductViews from "./ProductViews.js"
import ProductEndPoint from "./ProductEndPoint.js"
import handlebars from "express-handlebars"

const port = 8081;
const app = express();

/* Starting Handlebars */
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
/* Ending Handlebars */

app.use(express.json());
/* css */
app.use("/public", express.static("src/Assets"));
/* css */
app.use("/api/products", ProductEndPoint);
app.use("/api/carts", cartEndPoint);
app.use("/home", ProductViews);

const connectionInstance =   app.listen(port, () => {
  console.log(`Server is running on port 8081 ${port}`);
});

export default connectionInstance;