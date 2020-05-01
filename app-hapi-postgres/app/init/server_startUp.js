const Hapi = require('@hapi/hapi');
const routers = require('../models/routers');

const server = Hapi.server({
  port: 3000,
  host: 'localhost',
});

server.route(routers);

const initServer = async () => {
  await server.start();
  console.log('Server start up on port %s', server.info.port);
};

module.exports = { server, initServer };
