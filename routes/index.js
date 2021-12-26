import Router from 'koa-router';

const FOLDERS = [
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
