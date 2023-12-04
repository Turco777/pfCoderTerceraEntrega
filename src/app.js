import express from "express";
import { Server } from "socket.io";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";

import productsRouter from "./routes/ProductsRouter.js";
import cartsRouter from "./routes/CartRouter.js";
import viewsRouter from "./routes/ViewsRouter.js";
import SessionsRouter from "./routes/SessionsRouter.js";

import __dirname from "./utils.js";
import config from "./config/config.js";
import initializePassportStrategies from "./config/passport.config.js";

import { cartsService, productsService } from "./services/index.js";

const app = express();

const PORT = process.env.PORT || 8080;

const connection = mongoose.connect(config.mongo.URL);
console.log("Base de datos conectada");

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

initializePassportStrategies();

//rutas
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", SessionsRouter);

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

const socketServer = new Server(httpServer);

