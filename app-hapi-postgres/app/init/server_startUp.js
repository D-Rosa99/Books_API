import Hapi from '@hapi/hapi';
import morgan from 'morgan';
import routers from '../models/routers';

const server = Hapi.server({
  port: 3000,
  host: '0.0.0.0',
});

server.route(routers);

const initServer = async () => {
  await server.start();
  console.log('Server start up on port %s', server.info.port);
};

export { server, initServer };
