import path from 'path';
import { Configuration } from 'webpack';

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const clientPath = './src';

export const getWebpackConfig = ({
  name,
  isDevelopment,
  port,
  dirname,
}: {
  name: string;
  isDevelopment: boolean;
  port?: string;
  dirname: string;
}): Configuration => {
  const pkgName = name.replace('@services/', '');
  const portNum = port ? Number(port) : 8080;

  const localNodeModules = path.resolve(dirname, 'node_modules');

  return {
    mode: isDevelopment ? 'development' : 'production',
    target: 'web',
    entry: [path.resolve(clientPath, 'boot.ts')],
    output: {
      filename: 'bundle.js',
      libraryTarget: 'system',
      chunkLoadingGlobal: `webpackJsonp_${pkgName}`,
    },
    devtool: isDevelopment ? 'source-map' : false,
    resolve: {
      alias: {
        // External aliases
        'react-dom': isDevelopment ? '@hot-loader/react-dom' : 'react-dom',
      },
      modules: [clientPath, localNodeModules, 'node_modules'],
      extensions: ['.ts', '.tsx', '.js', 'jsx'],
    },
    optimization: {
      minimize: !isDevelopment,
      moduleIds: isDevelopment ? 'named' : undefined,
      chunkIds: isDevelopment ? 'named' : undefined,
    },
    devServer: {
      hot: isDevelopment,
      port: portNum,
      allowedHosts: 'all',
    },
    module: {
      rules: [
        {
          parser: {
            system: false,
          },
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              sourceMap: isDevelopment,
              rootMode: 'upward',
            },
          },
        },
        {
          test: /\.pcss$/,
          use: [
            isDevelopment
              ? {
                  loader: 'style-loader',
                }
              : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: isDevelopment,
                modules: {
                  mode: 'local',
                  localIdentName: '[local]--[hash:base64:5]',
                  localIdentContext: path.resolve(dirname, 'src/client'),
                  exportLocalsConvention: 'dashesOnly',
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: isDevelopment,
                postcssOptions: {
                  config: path.resolve(dirname, '.postcssrc.js'),
                },
              },
            },
          ],
        },
        {
          test: /\.(svg|png|gif|jpeg|jpg|cur|woff|woff2)$/,
          type: 'asset/inline',
        },
      ],
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: './tsconfig.json',
          diagnosticOptions: {
            semantic: true,
            syntactic: true,
          },
        },
      }),
      ...(isDevelopment ? [] : [new MiniCssExtractPlugin({ filename: 'style.css' })]),
    ],
  };
};
