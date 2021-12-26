import Router from 'koa-router';

const FOLDERS = [
  await import('./admin/index.js'),
  await import('./capsules/index.js'),
  await import('./company/index.js'),
  await import('./cores/index.js'),
  await import('./crew/index.js'),
  await import('./dragons/index.js'),
  await import('./history/index.js'),
  await import('./landpads/index.js'),
  await import('./launches/index.js'),
  await import('./launchpads/index.js'),
  await import('./payloads/index.js'),
  await import('./roadster/index.js'),
  await import('./rockets/index.js'),
  await import('./ships/index.js'),
  await import('./starlink/index.js'),
];

const ROUTER = new Router();

// Register all routes + all versions
export default () => {
  FOLDERS.forEach((routeFolder) => {
    routeFolder?.default?.forEach((version) => {
      ROUTER.use(version?.default?.routes());
    });
  });
  return ROUTER.routes();
};
