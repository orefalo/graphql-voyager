const path = require('path');

const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

const VERSION = JSON.stringify(require('./package.json').version);

module.exports = function (_, { mode }) {
  return {
    mode: 'development',
    performance: {
      hints: false,
    },
    resolve: {
      extensions: [
        '.ts',
        '.tsx',
        '.mjs',
        '.js',
        '.json',
        '.css',
        '.svg',
        '.wasm',
      ],
    },
    target: 'web',
    entry: ['./src/polyfills.ts', './src/index.tsx'],
    // OUTPUT
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      //   //sourceMapFilename: '[name].[id].map',
      //   filename: 'bundle.js',
    },
    devtool: 'inline-source-map',
    node: false,
    devServer: {
      port: 9090,
      watchContentBase: true,
      stats: 'errors-only',
      contentBase: path.resolve(__dirname, 'dist'),
    },

    // OPTIMIZATIONS
    // optimization: {
    //   minimizer: [
    //     new UglifyJsPlugin({
    //       uglifyOptions: {
    //         output: {
    //           comments: false,
    //         },
    //       },
    //     }),
    //     new OptimizeCSSAssetsPlugin({
    //       cssProcessorPluginOptions: {
    //         preset: ['default', { discardComments: { removeAll: true } }],
    //       },
    //     }),
    //   ],
    // },

    //PLUGINS
    plugins: [
      new webpack.ProgressPlugin(),
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({ IS_BROWSER: true }),
      new webpack.LoaderOptionsPlugin({
        worker: {
          output: {
            filename: '[name].worker.js',
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: '!!prerender-loader?string!src/index.html',
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
        },
      }),

      //   new webpack.DefinePlugin({
      //     VERSION: VERSION,
      //   }),

      //   new HtmlWebpackPlugin({
      //     template: './demo/index.html',
      //   }),

      //   new ExtractTextPlugin({
      //     filename: 'voyager.css',
      //     allChunks: true,
      //   }),
    ],
    //MODULES
    module: {
      rules: [
        {
          oneOf: [
            // {
            //   test: /\.wasm$/,
            //   type: 'javascript/auto',
            //   use: { loader: 'file-loader' },
            // },
            { test: /\.graphql?$/, loader: 'webpack-graphql-loader' },
            {
              test: /\.tsx?$/,
              use: 'ts-loader',
              exclude: [/\.(spec|e2e)\.ts$/],
            },
            {
              test: /\.(js|mjs)$/,
              use: {
                loader: 'babel-loader',
              },
            },
            {
              test: /\.css$/,
              exclude: /variables\.css$/,
              use: ['style-loader', 'css-loader', 'postcss-loader?sourceMap'],
            },
            // {
            //   test: /\.css$/,
            //   exclude: /variables\.css$/,
            //   use: ExtractTextPlugin.extract({
            //     fallback: 'style-loader',
            //     use: [
            //       {
            //         loader: 'css-loader',
            //         options: {
            //           sourceMap: true,
            //         },
            //       },
            //       'postcss-loader?sourceMap',
            //     ],
            //   }),
            // },
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
      ],
    },
  };
};
