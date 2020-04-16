const mongoose = require('mongoose');
const logger = require('../logger/index');
const config = require('config');
const db = config.get('db');

module.exports = () =>
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => logger.info('Database connect!'))
    .catch((err) => logger.error('Somethin went wrong! ', err));
