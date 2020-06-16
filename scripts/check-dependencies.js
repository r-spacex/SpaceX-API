const npmCheck = require('npm-check');

(async () => {
  const currentState = await npmCheck();
  const packages = currentState.get('packages');
  const unusedPackages = packages.filter(({ unused }) => unused);

  if (unusedPackages.length) {
    const unedPackagesAsString = unusedPackages.map(({ moduleName }) => moduleName).join(',');
    throw new Error(`There are unused dependencies : ${unedPackagesAsString}`);
  }
})();
