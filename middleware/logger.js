import pino from 'pino';

const opts = {
  transport: {
    target: 'pino-pretty',
  },
};

const env = process.env.NODE_ENV;
const isLocal = (env !== 'production' || env !== 'stage');

export default isLocal ? pino(opts) : pino();
