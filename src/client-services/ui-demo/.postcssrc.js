const postcssConfig = require('@packages/postcss-config');

module.exports = postcssConfig({
  importPathFromPackagesUi: false,
  importPaths: ['../../packages/ui/dist/styles']
});
