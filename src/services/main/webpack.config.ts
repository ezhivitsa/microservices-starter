import * as path from 'path';
import * as webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';

import {config, ENV} from './src/server/lib/config';
import {readJsonFile} from './src/server/lib/resources';

const babelConfig = readJsonFile('./babel.client.config.json');

const isDevBuild = (ENV === 'development');
const {buildPath, staticUrl} = config;

const clientPath = path.resolve(__dirname, 'src/client');
const localNodeModulesPath = path.resolve(__dirname, 'node_modules');

const webpackConfig: webpack.Configuration = {
    mode: isDevBuild ? 'development' : 'production',
    target: 'web',
    entry: () => {
        const boot = path.resolve(clientPath, 'boot.tsx');
        return isDevBuild ? ['webpack-hot-middleware/client?path=/__webpack_hmr&reload=true', boot] : boot;
    },
    output: {
        path: path.resolve(buildPath),
        filename: 'app.bundle.js',
        publicPath: `${staticUrl}/${buildPath}/`
    },
    devtool: isDevBuild ? 'source-map' : false,
    resolve: {
        alias: {
            // local aliases
            common: path.resolve(__dirname, './src/common'),
            i18n: path.resolve(__dirname, './src/i18n/tool/ru.js'),
            // External aliases
            packages: path.resolve(__dirname, '../../packages')
        },
        modules: [clientPath, localNodeModulesPath, path.resolve(__dirname, '../../node_modules')],
        extensions: ['.ts', '.tsx']
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM'
    },
    optimization: {
        minimize: !isDevBuild,
        namedModules: isDevBuild,
        namedChunks: isDevBuild
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        exclude: /node_modules/
                    }
                ]
            },
            {
                test: /\.pcss$/,
                use: [
                    isDevBuild ?
                        {
                            loader: 'style-loader',
                            options: {
                                sourceMap: isDevBuild
                            }
                        } : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: isDevBuild
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: isDevBuild
                        }
                    }
                ]
            },
            {
                test: /\.(svg|png|gif|jpeg|jpg|cur|woff|woff2)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '_/[hash].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new CopyPlugin([
            {from: path.resolve(__dirname, 'resources/public'), to: path.resolve(buildPath, 'public')}
        ]),
        ...isDevBuild ?
            [new webpack.HotModuleReplacementPlugin()] :
            [new MiniCssExtractPlugin({filename: 'app.style.css'})]
    ]
};

module.exports = webpackConfig;
