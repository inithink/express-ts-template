import express from "express";
import {needAuth} from "../libs/needAuth";

export const auth = needAuth()

export default function (req: express.Request, res: express.Response) {
  return "OK"
};