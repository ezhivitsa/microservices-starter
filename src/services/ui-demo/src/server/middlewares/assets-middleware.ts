import { join, resolve } from 'path';
import { Middleware } from 'koa';

import koaWebpack from 'koa-webpack';
import mount from 'koa-mount';
import serve from 'koa-static';

import { config } from 'lib/config';

const publicPath = join('/', config.buildPath);
const port = process.env.HRM_PORT ? Number(process.env.HRM_PORT) : 8180;

export const prepareAssetsMiddleware = async (): Promise<Middleware> => {
  if (config.enableHotLoader) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const webpackConfig = require('../../../webpack.config');

    return koaWebpack({
      config: webpackConfig,
      hotClient: {
        host: 'localhost',
        port,
      },
    });
  }

  return mount(publicPath, serve(resolve(config.buildPath)));
};
