import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { parse } from "yaml";
import fs from "node:fs/promises";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "./passport.js";

import TrainRouter from "./routers/TrainRouter.js"
import usersRouter from "./routers/usersRouter.js";
import TrainStationRouter from "./routers/TrainStationRouter.js"
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(cors({}));
app.use(passport.initialize());
app.use(passport.session());

app.use(async function logRequest(req, res, next) {
  next();
});

app.use("/trains", TrainRouter);
app.use("/users", usersRouter);
app.use("/trainstation", TrainStationRouter)

export default app;
