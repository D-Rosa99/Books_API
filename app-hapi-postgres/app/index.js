import { initServer } from './init/server_startUp';
import db from './init/db_startUp';
import logger from './utils/logger';

process.on('unhandledRejection', (err) => {
  logger.error(err);
});

db.authenticate()
  .then(() => {
    logger.info('database conected');
  })
  .catch((err) => logger.error('Something went wrong: ', err));

db.sync()
  .then(() => {
    initServer();
  })
  .catch((err) => {
    logger.error('Something went wrong during syncronization ', err);
  });
