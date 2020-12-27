const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const postcssNested = require('postcss-nested');
const cssVariables = require('postcss-css-variables');

const cssnano = require('cssnano');

const { mediaQueries } = require('@packages/media');

const packagesUiImportPath = './node_modules/@packages/ui/dist/styles';

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
    cssVariables(),
    postcssPresetEnv({
      stage: 2,
      features: {
        'custom-media-queries': {
          importFrom: [
            {
              customMedia: mediaQueries
            }
          ]
        },
        'custom-properties': false
      }
    }),
    cssnano()
  ]
});
