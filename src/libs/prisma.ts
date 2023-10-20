/* eslint-disable */
import {PrismaClient} from '@prisma/client';
import {env} from '../env';

let prisma: PrismaClient = getClient();

function getClient() {
  const { DATABASE_URL } = env;

  const databaseUrl = new URL(DATABASE_URL);

  // NOTE: during development if you change anything in this function, remember
  // that this only runs once per server restart and won't automatically be
  // re-run per request like everything else is. So if you need to change
  // something in this file, you'll need to manually restart the server.
  return new PrismaClient({
    // log: ['query', 'info', 'warn'],
    datasources: {
      db: {
        url: databaseUrl.toString(),
      },
    },
  });
}

export { prisma };
