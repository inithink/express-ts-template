import express from "express";
import cookieParser from "cookie-parser";
import {registerRoutes} from "./registerRoutes";
import {prisma} from "./libs/prisma";

const app = express();

prisma.$connect()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
registerRoutes(app);
// app.use(express.static(path.join(__dirname, '../public')))

export default app;
