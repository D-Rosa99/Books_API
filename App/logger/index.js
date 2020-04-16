const { transports, format, createLogger } = require('winston');

const logger = createLogger({
  format: format.combine(format.simple()),
  transports: [new transports.Console({ level: 'debug' })],
});

module.exports = logger;
