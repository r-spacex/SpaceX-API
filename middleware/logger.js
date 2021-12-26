import koaPino from 'koa-pino-logger';
import pino from 'pino';

const devOpts = {
  transport: {
    target: 'pino-pretty',
  },
};

const env = process.env.NODE_ENV;

let requestLog;
let logger;

if (env === 'production' || env === 'stage') {
  requestLog = koaPino();
  logger = pino();
} else {
  requestLog = koaPino(devOpts);
  logger = pino(devOpts);
}

export { requestLog as requestLogger, logger };
