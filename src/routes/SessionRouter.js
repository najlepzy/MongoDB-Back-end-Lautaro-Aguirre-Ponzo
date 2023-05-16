import express from "express";
import session from "express-session"; 
import { Router } from "express";
import "../Dao/models/UserSchema.js";
import fileStore from "session-file-store";
import auth from "./auth.js";
import mongoStore from "connect-mongo"; 
import {login, logout, signup} from "../controllers/sessionController.js"

const sessionRouter = express();

  sessionRouter.use(
    session({
      store: mongoStore.create({ mongoUrl: process.env.URI, ttl: 15 }),
      secret: "my-secret",
      resave: false,
      saveUninitialized: false,
    })
  );
  
sessionRouter.post("/login", login);
sessionRouter.post("/logout", logout);
sessionRouter.post("/signup", signup);

export default sessionRouter;
