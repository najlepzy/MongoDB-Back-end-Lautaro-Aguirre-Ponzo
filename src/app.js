import express from "express";
import cartRouter from "./routes/CartRouter.js";
import ProductViews from "./routes/ProductViews.js";
import ProductsRouter from "./routes/ProductsRouter.js";
import cookieRouter from "./routes/CookieRouter.js";
import handlebars from "express-handlebars";


const port = 8081;
const app = express();
app.use(express.urlencoded({ extended: true }));

/* Starting Handlebars */
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "src/views");
/* Ending Handlebars */

app.use(express.json());
/* css */
app.use("/public", express.static("public"));
/* css */

/* Mongoose Start*/
app.use("/api/products", ProductsRouter);
/* Mongoose End*/
app.use("/api/carts", cartRouter);
app.use("/home", ProductViews);

/* Multer Start */
// app.use("/api/multer", MulterRouter);
/* Multer End*/
/* CookieParser */
app.use("/api/cookies", cookieRouter);
/* CookieParser */

const connectionInstance = app.listen(port, () => {
  console.log(`Server is running on port 8081 ${port}`);
});

export default connectionInstance;
