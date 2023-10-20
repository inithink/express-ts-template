import express from "express";
import {needAuth} from "../libs/needAuth";
import {getAccounts} from "../core/service-account/queries/getAccounts";

export const auth = needAuth()

export default async function (req: express.Request, res: express.Response) {
  let userId = req.user.userId;
  return await getAccounts(userId)
};