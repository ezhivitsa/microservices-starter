import path from 'path';

import { Configuration } from 'webpack';
import { Configuration as DevConfiguration } from 'webpack-dev-server';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const clientPath = './src';
const localNodeModulesPath = './node_modules';

const isDevelopment = Boolean(process.env.LOCAL);

const webpackConfig: Configuration & DevConfiguration = {
  mode: isDevelopment ? 'development' : 'production',
  target: 'web',
  entry: ['react-hot-loader/patch', path.resolve(clientPath, 'boot.tsx')],
  output: {
    filename: 'bundle.js',

    libraryTarget: 'system',
    jsonpFunction: `webpackJsonp_${name}`,
  },
  devtool: isDevelopment ? 'source-map' : false,
  resolve: {
    alias: {
      // External aliases
      '@packages/ui': path.resolve(__dirname, '../../packages/ui/src'),
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
        configFile: './src/client/tsconfig.json',
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
    ...(isDevelopment ? [] : [new MiniCssExtractPlugin({ filename: `${name}.style.css` })]),
  ],
};

module.exports = webpackConfig;
