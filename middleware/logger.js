import koaPino from 'koa-pino-logger';
import pino from 'pino';

const opts = {
  transport: {
    target: 'pino-pretty',
  },
};

const env = process.env.NODE_ENV;
const isLocal = (env !== 'production' || env !== 'stage');
const requestLog = isLocal ? koaPino(opts) : koaPino();

export default isLocal ? pino(opts) : pino();
export {
  requestLog as requestLogger,
};
