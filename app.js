import Fastify from 'fastify';
import mongoose from 'mongoose';

export default async (opts = {}) => {
  const fastify = Fastify(opts);
  mongoose.connect(process.env.SPACEX_MONGO, {
    bufferCommands: false,
  });
  const db = mongoose.connection;
  db.on('error', (err) => {
    fastify.log.error(err);
  });
  db.once('connected', () => {
    fastify.log.info('Mongo connected');
  });
  db.on('reconnected', () => {
    fastify.log.info('Mongo re-connected');
  });
  db.on('disconnected', () => {
    fastify.log.info('Mongo disconnected');
  });
  return fastify;
};
