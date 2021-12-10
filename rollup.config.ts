import { nodeResolve } from '@rollup/plugin-node-resolve';
import OMT from '@surma/rollup-plugin-off-main-thread';
import url from '@rollup/plugin-url';
import postCSSVariable from 'postcss-css-variables';

import postcss from 'rollup-plugin-postcss';
import typescript from '@rollup/plugin-typescript';

import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import image from '@rollup/plugin-image';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'amd',
  },
  plugins: [
    nodeResolve(),
    OMT(),
    typescript({ lib: ['es5', 'es6', 'dom'], target: 'es5' }),
    postcss({
      plugins: [postCSSVariable],
    }),
    url({
      include: '**/*.wasm',
    }),
    image(),
    postcss({
      extensions: ['.css'],
    }),
    nodeResolve({
      extensions: ['.js'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    babel({
      presets: ['@babel/preset-react'],
    }),
    commonjs(),
    serve({
      open: true,
      verbose: true,
      contentBase: ['', 'public'],
      host: 'localhost',
      port: 3000,
    }),
    livereload({ watch: 'dist' }),
  ],
};
