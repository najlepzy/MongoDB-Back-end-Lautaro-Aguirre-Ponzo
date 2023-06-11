import "./core/Connection.js";
import express from "express";
import session from "express-session";
import cartRouter from "././presentation/routes/CartRouter.js";
import ProductViews from "././presentation/routes/ProductViews.js";
import ProductsRouter from "././presentation/routes/ProductsRouter.js";
import cookieRouter from "././presentation/routes/CookieRouter.js";
import userRouter from "././presentation/routes/userRouter.js";
import sessionRouter from "././presentation/routes/SessionRouter.js";
import errorHandler from "./utils/errorHandler.js";
import logger from "./utils/logger.js";
import handlebars from "express-handlebars";
import { fork } from "child_process";
const port = process.env.PORT;
const app = express();
app.use(express.urlencoded({ extended: true }));

/* Starting Handlebars */

/* app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "src/views"); */

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

/* logger */
app.use(logger);
/* logger */

/* Session */
app.use("/api/sessions", sessionRouter);
app.use("/api/users", userRouter);
/* Session */
app.use(errorHandler);

app.get("/", (req, res) => {
  const childProcess = fork("./presentation/middlewares/worker");

  childProcess.send({ num1: 2, num2: 3 });

  childProcess.on("message", (result) => {
    res.send(`Result: ${result}`);
    childProcess.kill();
  });

  childProcess.on("error", (error) => {
    console.error(error);
    res.status(500).send("Error occurred");
  });
});

const connectionInstance = app.listen(port, () => {
  console.log(`Server is running on port  ${port}`);
});

export default connectionInstance;
