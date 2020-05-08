const { initServer } = require('./init/server_startUp');
const db = require('./init/db_startUp');

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

initServer();

db.authenticate()
  .then(() => {
    console.log('database conected');
  })
  .catch((err) => console.log('Please check went wrong: ', err));
