const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const postcssNested = require('postcss-nested');

const cssnano = require('cssnano');

const packagesUiImportPath = '../../packages/ui/src/styles';

/**
 * Get postcss configuration
 * @param {Object} options
 * @param {boolean} importPathFromPackagesUi - add path to import styles from "packages/ui/styles"
 * @param {string[]} importPaths - additional paths to import styles
 * @returns {Object} postcss config
 */
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
