/* eslint-disable no-restricted-syntax */
import Router from 'koa-router';

const FOLDERS = await Promise.all([
  import('./admin/index.js'),
  import('./capsules/index.js'),
  import('./company/index.js'),
  import('./cores/index.js'),
  import('./crew/index.js'),
  import('./dragons/index.js'),
  import('./history/index.js'),
  import('./landpads/index.js'),
  import('./launches/index.js'),
  import('./launchpads/index.js'),
  import('./payloads/index.js'),
  import('./roadster/index.js'),
  import('./rockets/index.js'),
  import('./ships/index.js'),
  import('./starlink/index.js'),
  import('./users/index.js'),
]);

const ROUTER = new Router();

// Register all routes + all versions
export default async () => {
  for await (const routeFolder of FOLDERS) {
    if (routeFolder?.default) {
      for await (const version of routeFolder.default) {
        ROUTER.use(version?.default?.routes());
      }
    }
  }
  return ROUTER.routes();
};
