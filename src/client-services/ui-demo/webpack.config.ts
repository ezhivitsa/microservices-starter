import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import { config, isDevelopment } from './src/server/lib/config';

import pkg from './package.json';

const { buildPath, staticUrl } = config;

const name = pkg.name.replace('@client-services/', '');

const clientPath = path.resolve(__dirname, 'src/client');
const localNodeModulesPath = path.resolve(__dirname, 'node_modules');

const webpackConfig: webpack.Configuration = {
  mode: isDevelopment ? 'development' : 'production',
  target: 'web',
  entry: ['construct-style-sheets-polyfill', path.resolve(clientPath, 'boot.tsx')],
  output: {
    path: path.resolve(buildPath),
    filename: 'main.bundle.js',
    publicPath: `${staticUrl}/${buildPath}/`,

    library: name,
    libraryTarget: 'umd',
    jsonpFunction: `webpackJsonp_${name}`,
  },
  node: {
    fs: 'empty',
  },
  devtool: isDevelopment ? 'source-map' : false,
  resolve: {
    alias: {
      // local aliases
      common: path.resolve(__dirname, './src/common'),
      // External aliases
      'react-dom': isDevelopment ? '@hot-loader/react-dom' : 'react-dom',
      '@packages/ui': path.resolve(__dirname, '../../packages/ui/src'),
    },
    modules: [
      clientPath,
      path.resolve(__dirname, '../../../node_modules'),
      'node_modules',
      path.resolve(__dirname, '../../packages'),
    ],
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
  },
  optimization: {
    minimize: !isDevelopment,
    namedModules: isDevelopment,
    namedChunks: isDevelopment,
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
                localIdentContext: path.resolve(__dirname, 'src/client'),
                exportLocalsConvention: 'dashesOnly',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: isDevelopment,
              postcssOptions: {
                config: path.resolve(__dirname, '.postcssrc.js'),
              },
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
    ...(isDevelopment ? [] : [new MiniCssExtractPlugin({ filename: 'main.style.css' })]),
  ],
};

module.exports = webpackConfig;
