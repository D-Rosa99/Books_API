import morgan from 'morgan';
import express from 'express';
import logger from '../logger/index';

import genreRouters from '../genre/routers';
import bookRouters from '../book/routers';
import dbInit from './db_startUp';

dbInit();
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/book_api/genre/', genreRouters);
app.use('/api/book_api/book/', bookRouters);
const server = app.listen(3000, () =>
  logger.info(`Server started on port 3000`)
);

export default server;
