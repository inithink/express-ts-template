import express from "express";
import cookieParser from "cookie-parser";
import indexRouter from "./routes/index";
import * as path from "path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', indexRouter);
app.use(express.static(path.join(__dirname, '../public')))

export default app;
