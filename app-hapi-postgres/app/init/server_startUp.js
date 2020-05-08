import Hapi from '@hapi/hapi';
import laabr from 'laabr';
import routers from '../models/routers';
import logger from '../utils/logger';

const server = Hapi.server({
  port: 3000,
  host: '0.0.0.0',
});

server.route(routers);

const initServer = async () => {
  await server.register({
    plugin: laabr,
    options: {
      formats: {
        onPostStart: ':time :start :level :message',
        log: false,
      },
      tokens: { start: () => '[start]' },
      indent: 0,
      colored: true,
    },
  });

  await server.start();
  logger.info(`Server start up on port ${server.info.port}`);
};

export { server, initServer };
