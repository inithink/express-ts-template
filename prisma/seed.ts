import {logger} from "../src/libs/logger";

(async () => {
  console.log('OK');
})().catch((err) => logger.error(err.stack));
