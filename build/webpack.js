const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeExternals = require('webpack-node-externals')({
  whitelist: ['viz.js/full.render.js'],
});

const root = require('./helpers').root;
const VERSION = JSON.stringify(require('../package.json').version);

// const BANNER = `GraphQL Voyager - Represent any GraphQL API as an interactive graph
// -------------------------------------------------------------
//   Version: ${VERSION}
//   Repo: https://github.com/APIs-guru/graphql-voyager`;

module.exports = (env = {}, { mode }) => ({
  performance: {
    hints: false,
  },

  //   optimization: {
  //     minimize: !env.lib,
  //   },

  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: 'css/mini-extract',
          chunks: 'all',
          enforce: true,
        },
      },
    },
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

  resolve: {
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.json', '.css', '.svg'],
    alias: {
      clipboard: 'clipboard/dist/clipboard.min.js',
    },
  },

  externals: env.lib
    ? nodeExternals
    : {
        react: {
          root: 'React',
          commonjs2: 'react',
          commonjs: 'react',
          amd: 'react',
        },
        'react-dom': {
          root: 'ReactDOM',
          commonjs2: 'react-dom',
          commonjs: 'react-dom',
          amd: 'react-dom',
        },
      },
  entry: ['./src/polyfills.ts', './src/index.tsx'],
  output: {
    path: root('dist'),
    filename: env.lib ? 'voyager.lib.js' : 'voyager.min.js',
    sourceMapFilename: '[file].map',
    library: 'GraphQLVoyager',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },

  plugins: [
    new webpack.DefinePlugin({
      VERSION: VERSION,
    }),
    new MiniCssExtractPlugin({
      //   filename: '[name].css',
    }),
    // new ExtractTextPlugin({
    //   filename: 'voyager.css',
    //   allChunks: true,
    // }),

    // new webpack.BannerPlugin(BANNER),
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [/\.(spec|e2e)\.ts$/],
      },
      {
        test: /\.render\.js$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'voyager.worker.js',
            },
          },
        ],
      },
      //   {
      //     test: /\.css$/,
      //     exclude: /variables\.css$/,
      //     use: ExtractTextPlugin.extract({
      //       fallback: 'style-loader',
      //       use: [
      //         {
      //           loader: 'css-loader',
      //           options: {
      //             sourceMap: true,
      //           },
      //         },
      //         'postcss-loader?sourceMap',
      //       ],
      //     }),
      //   },
      {
        test: /\.css$/,
        exclude: /variables\.css$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].css',
            },
          },
          {
            loader: 'extract-loader',
          },
          //   {
          //     loader: MiniCssExtractPlugin.loader,
          //   },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader?sourceMap',
          },
        ],
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
                '@babel/plugin-transform-classes',
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
});
