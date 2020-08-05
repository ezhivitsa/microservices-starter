import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import { config, ENV } from './src/server/lib/config';

const isDevBuild = true; //ENV === 'development';
const { buildPath, staticUrl } = config;

const clientPath = path.resolve(__dirname, 'src/client');
const localNodeModulesPath = path.resolve(__dirname, 'node_modules');

const webpackConfig: webpack.Configuration = {
  mode: isDevBuild ? 'development' : 'production',
  target: 'web',
  entry: () => {
    const boot = path.resolve(clientPath, 'boot.ts');
    return [boot];
  },
  output: {
    path: path.resolve(buildPath),
    filename: 'app.bundle.js',
    publicPath: `${staticUrl}/${buildPath}/`,
  },
  devtool: isDevBuild ? 'source-map' : false,
  resolve: {
    alias: {
      // local aliases
      common: path.resolve(__dirname, './src/common'),
      // External aliases
      packages: path.resolve(__dirname, '../../packages'),
      'react-dom': isDevBuild ? '@hot-loader/react-dom' : 'react-dom',
    },
    modules: [clientPath, localNodeModulesPath, path.resolve(__dirname, '../../../node_modules')],
    extensions: ['.ts', '.tsx', '.js'],
  },
  optimization: {
    minimize: !isDevBuild,
    namedModules: isDevBuild,
    namedChunks: isDevBuild,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            sourceMap: isDevBuild,
          },
        },
      },
      {
        test: /\.pcss$/,
        use: [
          isDevBuild
            ? {
                loader: 'style-loader',
                options: {
                  sourceMap: isDevBuild,
                },
              }
            : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDevBuild,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: isDevBuild,
            },
          },
        ],
      },
      {
        test: /\.(svg|png|gif|jpeg|jpg|cur|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '_/[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: './src/client/tsconfig.json',
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'resources/public'),
          to: path.resolve(buildPath, 'public'),
        },
      ],
    }),
    ...(isDevBuild ? [] : [new MiniCssExtractPlugin({ filename: 'app.style.css' })]),
  ],
};

module.exports = webpackConfig;
