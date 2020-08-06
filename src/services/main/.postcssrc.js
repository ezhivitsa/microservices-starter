const postcssConfig = require('@packages/postcss-config');

// const postcssImport = require('postcss-import');
// const postcssPresetEnv = require('postcss-preset-env');
// const postcssNested = require('postcss-nested');

// const cssnano = require('cssnano');

module.exports = () => ({
  plugins: [
    postcssImport({
      path: ['src/client/styles']
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
