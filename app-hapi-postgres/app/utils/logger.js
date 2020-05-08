import { createLogger, transports, format } from 'winston';

export default createLogger({
  format: format.combine(format.simple()),
  transports: [
    new transports.File({
      maxFiles: 5,
      maxsize: 5120000,
      filename: `${__dirname}/logs/log-api.log`,
    }),
    new transports.Console({
      level: 'debug',
    }),
  ],
});
