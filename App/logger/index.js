const { transports, format, createLogger } = require('winston');

const logger = createLogger({
  format: format.combine(format.simple()),
  transports: [new transports.Console({ level: 'debug' })],
  exceptionHandlers: [
    new transports.File({ filename: './exceptions.log', level: 'warn' }),
  ],
});

module.exports = logger;
