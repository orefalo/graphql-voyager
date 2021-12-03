const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const root = require('./helpers').root;
const VERSION = JSON.stringify(require('../package.json').version);

module.exports = function (_, { mode }) {
  return {
    performance: {
      hints: false,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.mjs', '.js', '.json', '.css', '.svg'],
    },
    entry: ['./src/polyfills.ts', './src/index.tsx'],
    // OUTPUT
    output: {
      path: root('demo-dist'),
      filename: '[name].js',
      sourceMapFilename: '[name].[id].map',
    },
    // DEV SERVER
    devServer: {
      contentBase: root('src'),
      watchContentBase: true,
      port: 9090,
      stats: 'errors-only',
    },

    // OPTIMIZATIONS
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false,
            },
          },
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
        }),
      ],
    },

    //PLUGINS
    plugins: [
      new webpack.LoaderOptionsPlugin({
        worker: {
          output: {
            filename: '[name].worker.js',
          },
        },
      }),

      new webpack.DefinePlugin({
        VERSION: VERSION,
      }),

      new HtmlWebpackPlugin({
        template: './demo/index.html',
      }),

      new ExtractTextPlugin({
        filename: 'voyager.css',
        allChunks: true,
      }),
    ],
    //MODULES
    module: {
      rules: [
        { test: /\.graphql?$/, loader: 'webpack-graphql-loader' },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: [/\.(spec|e2e)\.ts$/],
        },
        {
          test: /\.render\.js$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'voyager.worker.js',
            },
          },
        },
        {
          test: /\.css$/,
          exclude: /variables\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                },
              },
              'postcss-loader?sourceMap',
            ],
          }),
        },
        {
          test: /variables\.css$/,
          loader: 'postcss-variables-loader?es5=1',
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                plugins: [
                  '@babel/plugin-transform-block-scoping',
                  '@babel/plugin-transform-arrow-functions',
                  '@babel/plugin-transform-destructuring',
                ],
              },
            },
            {
              loader: 'react-svg-loader',
              options: {
                jsx: false,
                svgo: {
                  plugins: [{ mergePaths: false }],
                },
              },
            },
          ],
        },
      ],
    },
  };
};
