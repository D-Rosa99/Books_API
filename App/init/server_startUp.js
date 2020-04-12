const morgan = require('morgan');
const express = require('express');
const app = express();
const logger = require('../logger/index');

const genreRouters = require('../genre/routers');
const bookRouters = require('../book/routers');

const port = 3000 || process.env.port;
module.exports = () => {
  app.use(morgan('dev'));
  app.use(express.json());
  app.use('/api/Book_API/genre/', genreRouters);
  app.use('/api/Book_API/book/', bookRouters);
  app.listen(port, () => logger.info(`Server started on port ${port}`));
};
