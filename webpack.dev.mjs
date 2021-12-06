import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import clean from 'clean-webpack-plugin';
import webpack from 'webpack';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
export default {
  mode: 'development',
  target: 'web',
  entry: ['./src/polyfills.ts', './src/index.tsx'],
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /^worker-loader!/,
        use: [
          {
            loader: 'worker-loader',
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /^file-loader!/,
        use: 'file-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        exclude: /variables\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /variables\.css$/,
        loader: 'postcss-variables-loader',
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
      { test: /\.graphql?$/, loader: 'webpack-graphql-loader' },
    ],
  },
  plugins: [
    new clean.CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.html',
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.json', '.css', '.svg'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: './dist',
  },
};
