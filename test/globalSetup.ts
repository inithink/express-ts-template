import util from 'util';

import {exec as execCallback} from 'child_process';
import {prisma} from "../src/libs/prisma";
import {logger} from "../src/libs/logger";

const exec = util.promisify(execCallback);

module.exports = async function () {
  console.log('docker-compose up -d');
  await exec('docker-compose up -d');
  console.log('npx wait-port 5433');
  await exec('npx wait-port 5433');
  console.log('yarn prisma:setup:test');
  await exec('yarn prisma:setup:test');
  console.log('prisma.$connect()');
  await prisma.$connect();
  logger.info(`🔌 Prisma client connected`);
};
