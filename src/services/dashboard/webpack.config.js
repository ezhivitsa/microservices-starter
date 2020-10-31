/* eslint-disable @typescript-eslint/no-var-requires */
// const { lib } = require('@packages/client');

// const pkg = require('./package.json');

// const isDevelopment = Boolean(process.env.LOCAL);
// const port = process.env.NODEJS_PORT;

// module.exports = lib.getWebpackConfig({
//   name: pkg.name,
//   isDevelopment,
//   port,
// });
const path = require('path');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const pkg = require('./package.json');
const isDevelopment = Boolean(process.env.LOCAL);
const port = process.env.NODEJS_PORT ? Number(process.env.NODEJS_PORT) : 8080;

const name = pkg.name.replace('@services/', '');
const clientPath = './src';
const localNodeModulesPath = './node_modules';

const webpackConfig = {
  mode: isDevelopment ? 'development' : 'production',
  target: 'web',
  entry: [path.resolve(clientPath, 'boot.ts')],
  output: {
    filename: 'bundle.js',
    libraryTarget: 'system',
    jsonpFunction: `webpackJsonp_${name}`,
  },
  devtool: isDevelopment ? 'source-map' : false,
  resolve: {
    alias: {
      // External aliases
      'react-dom': isDevelopment ? '@hot-loader/react-dom' : 'react-dom',
    },
    modules: [
      clientPath,
      localNodeModulesPath,
      path.resolve(__dirname, '../../../node_modules'),
      path.resolve(__dirname, '../../packages'),
    ],
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
  },
  optimization: {
    minimize: !isDevelopment,
    namedModules: isDevelopment,
    namedChunks: isDevelopment,
  },
  devServer: {
    hot: isDevelopment,
    port,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    },
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
              config: {
                path: __dirname,
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

module.exports = webpackConfig;
