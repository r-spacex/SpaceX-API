const koaPino = require('koa-pino-logger');
const pino = require('pino');

const devOpts = {
  prettyPrint: true,
};

let requestLog;
let logger;

if (process.env.NODE_ENV === 'production') {
  requestLog = koaPino();
  logger = pino();
} else {
  requestLog = koaPino(devOpts);
  logger = pino(devOpts);
}

module.exports.requestLogger = requestLog;
module.exports.logger = logger;
