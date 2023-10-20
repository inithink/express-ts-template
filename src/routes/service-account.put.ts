import express from "express";
import {needAuth} from "../libs/needAuth";
import z from "zod";
import {changeServiceAccount} from "../core/service-account/commands/changeServiceAccount";

export const auth = needAuth()

export default async function (req: express.Request, res: express.Response) {
  let userId = req.user.userId;
  let dto = await schema.parseAsync(req.body);
  return await changeServiceAccount(
    userId,
    dto.id,
    dto.serviceName,
    dto.name,
    dto.accountInfo,
  )
};

const schema = z.object({
  id: z.string(),
  serviceName: z.string(),
  name: z.string(),
  accountInfo: z.any(),
})