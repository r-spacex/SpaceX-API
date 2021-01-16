const koaPino = require('koa-pino-logger');
const pino = require('pino');

const devOpts = {
  prettyPrint: true,
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

module.exports.requestLogger = requestLog;
module.exports.logger = logger;
