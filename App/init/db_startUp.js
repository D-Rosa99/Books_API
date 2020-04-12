const mongoose = require('mongoose');
const logger = require('../logger/index');

module.exports = () =>
  mongoose
    .connect('mongodb://localhost:27017/Book_API', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => logger.info('Database connect!'))
    .catch((err) => logger.error('Somethin went wrong! ', err));
