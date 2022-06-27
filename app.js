import conditional from 'koa-conditional-get';
import etag from 'koa-etag';
import cors from 'koa2-cors';
import dotenv from 'dotenv';
import helmet from 'koa-helmet';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import { responseTime, errors, logger } from './middleware/index.js';
import routes from './routes/index.js';

// Env init
dotenv.config();

const app = new Koa();

mongoose.connect(process.env.SPACEX_MONGO, {
  bufferCommands: false,
  family: 4,
});

const db = mongoose.connection;

db.on('error', (err) => {
  logger.error(err);
});
db.once('connected', () => {
  logger.info('Mongo connected');
  app.emit('ready');
});
db.on('reconnected', () => {
  logger.info('Mongo re-connected');
});
db.on('disconnected', () => {
  logger.info('Mongo disconnected');
});

// disable console.errors for pino
app.silent = true;

// Error handler
app.use(errors);

app.use(conditional());

app.use(etag());

app.use(bodyParser());

// HTTP header security
app.use(helmet());

// Enable CORS for all routes
app.use(cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowHeaders: ['Content-Type', 'Accept'],
  exposeHeaders: ['spacex-api-cache', 'spacex-api-response-time'],
}));

// Set header with API response time
app.use(responseTime);

// Register routes
app.use(await routes());

export default app;
