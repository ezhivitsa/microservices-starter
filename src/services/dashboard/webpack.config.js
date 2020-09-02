import { Configuration } from 'webpack';
import systemjsInterop from 'systemjs-webpack-interop/webpack-config';

const webpackConfig: Configuration = {};

module.exports = systemjsInterop(webpackConfig);
