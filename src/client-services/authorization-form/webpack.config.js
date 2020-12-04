/* eslint-disable @typescript-eslint/no-var-requires */
const { getWebpackConfig } = require('@packages/webpack');

const pkg = require('./package.json');
const isDevelopment = Boolean(process.env.LOCAL);

module.exports = getWebpackConfig({
  isDevelopment,
  name: pkg.name,
  port: process.env.NODEJS_PORT,
  dirname: __dirname,
});
