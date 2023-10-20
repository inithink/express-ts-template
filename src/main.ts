import app from "./app";
import http from "http";
import {prisma} from "./libs/prisma";
import {logger} from "./libs/logger";

(async () => {
  logger.info('Connecting to database...')
  await prisma.$connect()
  logger.info('Connected to database')
  const port = parseInt(process.env.PORT || '4000');
  app.set('port', port);
  const server = http.createServer(app);

  server.listen(port, '0.0.0.0');

  server.on('error', onError);
  server.on('listening', onListening);

  function onError(error: any) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = 'Port ' + port;

    switch (error.code) {
      case 'EACCES':
        logger.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        logger.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  function onListening() {
    logger.info('Listening on http://0.0.0.0:' + port);
  }
})()
  .catch(err => logger.error(err.stack))
