const morgan = require('morgan');
const express = require('express');
const app = express();
const logger = require('../logger/index');

const genreRouters = require('../genre/routers');
const bookRouters = require('../book/routers');

require('./db_startUp')();

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/book_api/genre/', genreRouters);
app.use('/api/book_api/book/', bookRouters);
const server = app.listen(3000, () =>
  logger.info(`Server started on port 3000`)
);

module.exports = server;
