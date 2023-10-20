import express from "express";
import {needAuth} from "../libs/needAuth";
import {addServiceAccount} from "../core/service-account/commands/addServiceAccount";
import z from "zod";

export const auth = needAuth()

export default async function (req: express.Request, res: express.Response) {
  let userId = req.user.userId;
  let dto = await schema.parseAsync(req.body);
  return await addServiceAccount(
    userId,
    dto.serviceName,
    dto.name,
    dto.accountInfo,
  )
};

const schema = z.object({
  serviceName: z.string(),
  name: z.string(),
  accountInfo: z.any(),
})