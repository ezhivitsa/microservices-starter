import { join, resolve } from 'path';
import { AppMiddleware } from 'koa';

import koaWebpack from 'koa-webpack';
import mount from 'koa-mount';
import serve from 'koa-static';

import { config } from '../lib/config';

const publicPath = join('/', config.buildPath);

export const prepareAssetsMiddleware = async (): Promise<AppMiddleware> => {
  if (config.enableHotLoader) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const webpackConfig = require('../../../webpack.config');

    return koaWebpack({
      config: webpackConfig,
      hotClient: {
        host: 'localhost',
        // post: 8081,
      },
    });
  }

  return mount(publicPath, serve(resolve(config.buildPath)));
};

// export const prepareAssetsMiddleware = (): AppMiddleware[] => {
//   if (config.enableHotLoader) {
//     // For development puprposes require() is used, becase webpack* modules
//     // are not available in the production environemnt

//     /* eslint-disable @typescript-eslint/no-require-imports */
//     /* eslint-disable @typescript-eslint/no-var-requires */
//     const webpack = require('webpack');
//     const webpackDevMiddleware = require('webpack-dev-middleware');
//     const webpackHotMiddleware = require('webpack-hot-middleware');
//     const webpackConfig = require('../../../webpack.config');
//     /* eslint-enable */

//     const webpackCompiler = webpack(webpackConfig);
//     return [webpackDevMiddleware(webpackCompiler, { publicPath }), webpackHotMiddleware(webpackCompiler)];
//   }

//   return [mount(publicPath, serve(resolve(config.buildPath)))];
// };
