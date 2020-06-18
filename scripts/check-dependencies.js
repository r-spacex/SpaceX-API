const npmCheck = require('npm-check');

const ignoredUnusedPackages = [
  'pino-pretty',
];

(async () => {
  const currentState = await npmCheck();
  const packages = currentState.get('packages');
  const unusedPackages = packages.filter(
    ({ moduleName, unused }) => !ignoredUnusedPackages.includes(moduleName) && unused,
  );

  if (unusedPackages.length) {
    const unusedPackagesAsString = unusedPackages.map(({ moduleName }) => moduleName).join(',');
    throw new Error(`There are unused dependencies : ${unusedPackagesAsString}`);
  }
})();
