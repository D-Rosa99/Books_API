import mongoose from 'mongoose';
import logger from '../logger/index';
import config from 'config';

const db = config.get('db');

export default () =>
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => logger.info('Database connect!'))
    .catch((err) => logger.error('Somethin went wrong! ', err));
