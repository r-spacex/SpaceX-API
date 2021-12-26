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

const exportedLogger = logger;
const exportedRequestLogger = requestLog;

export { exportedRequestLogger as requestLogger, exportedLogger as logger };
