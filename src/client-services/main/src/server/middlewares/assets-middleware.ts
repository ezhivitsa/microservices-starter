import { join, resolve } from 'path';
import { RouterAppMiddleware } from 'koa';
import webpack from 'webpack';

import mount from 'koa-mount';
import serve from 'koa-static';

import { config } from 'lib/config';

import { webpackDevMiddleware } from './webpack-dev-middleware';

const publicPath = join('/', config.buildPath);

export const prepareAssetsMiddleware = async (): Promise<RouterAppMiddleware> => {
  if (config.enableHotLoader) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const webpackConfig = require('../../../webpack.config');

    return webpackDevMiddleware(webpack(webpackConfig));
  }

  return mount(publicPath, serve(resolve(config.buildPath)));
};
