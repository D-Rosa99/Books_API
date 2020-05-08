import { initServer } from './init/server_startUp';
import db from './init/db_startUp';

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

db.authenticate()
  .then(() => {
    console.log('database conected');
  })
  .catch((err) => console.log('Something went wrong: ', err));

db.sync()
  .then(() => {
    initServer();
  })
  .catch((err) => {
    console.log('Something went wrong during syncronization ', err);
  });
