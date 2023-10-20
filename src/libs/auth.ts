import express from "express";
import {env} from "../env";
import {CognitoJwtVerifier} from 'aws-jwt-verify/cognito-verifier';
import {logger} from "./logger";

const verifier = CognitoJwtVerifier.create({
  userPoolId: env.COGNITO_USER_POOL_ID,
  clientId: env.COGNITO_USER_POOL_CLIENT_ID,
  tokenUse: 'access',
});

export function auth(allowedRoles: string[] = []) {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.headers?.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).end('Unauthorized')
    }

    try {
      const tokenPayload = await verifier.verify(token);

      const roles = tokenPayload['cognito:groups'] || [];

      if (allowedRoles.length > 0 && !allowedRoles.some((role) => roles.includes(role))) {
        return res.status(403).end('Forbidden')
      }

      req.user = {
        userId: tokenPayload.sub,
        roles,
      };

      next()
    } catch (e: any) {
      logger.warn(e.stack);
      return res.status(401).end('Unauthorized')
    }
  }
}