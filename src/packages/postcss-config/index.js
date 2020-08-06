const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const postcssNested = require('postcss-nested');

const cssnano = require('cssnano');

const packagesUiImportPath = '@packages/ui/styles';

module.exports = ({
  importPathFromPackagesUi,
  importPaths
}) => ({
  plugins: [
    postcssImport({
      path: [
        importPathFromPackagesUi ? packagesUiImportPath : '',
        ...(importPaths || [])
      ]
    }),
    postcssNested,
    postcssPresetEnv({
      stage: 2,
      feature: {
        'nesting-rules': true,
        'custom-media-queries': true
      }
    }),
    cssnano()
  ]
});
