import {initEnv} from '@orderlycode/env';
import z from 'zod';
import dotenv from 'dotenv'

dotenv.config()
export const env = initEnv({
  NODE_ENV: z.string().default('development'),
  PORT: z.string().default('4000'),
  DATABASE_URL: z.string(),
  COGNITO_USER_POOL_ID: z.string(),
  COGNITO_USER_POOL_CLIENT_ID: z.string(),
});

if (env.NODE_ENV === 'test') {
  env.DATABASE_URL = 'postgresql://prisma:prisma@localhost:5433/test';
}
