import app from './app.js';

const PORT = process.env.PORT || 6673;

const start = async () => {
  try {
    const opts = {
      logger: true,
    };
    const server = await app(opts);
    await server.listen(PORT);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
start();
