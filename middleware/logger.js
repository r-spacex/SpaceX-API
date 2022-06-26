import pino from 'pino';

const env = process.env.NODE_ENV;
const isLocal = (env !== 'production' || env !== 'stage');

export default isLocal ? pino() : pino();
