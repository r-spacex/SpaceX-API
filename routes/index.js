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
export default async (ctx, next) => {
  await Promise.all(
    FOLDERS.map(async (folder) => {
      const { default: versions } = await folder;
      versions.map(async (version) => {
        const { default: routes } = version;
        ROUTER.use(routes.routes());
      });
    })
  );
  console.log(ROUTER);
  return ROUTER.routes();
};
