import { transports, format, createLogger } from 'winston';

const logger = createLogger({
  format: format.combine(format.simple()),
  transports: [new transports.Console({ level: 'debug' })],
});

export default logger;
