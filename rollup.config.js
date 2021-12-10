import { nodeResolve } from '@rollup/plugin-node-resolve';
import OMT from '@surma/rollup-plugin-off-main-thread';
import url from '@rollup/plugin-url';

export default {
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'amd',
  },
  plugins: [
    nodeResolve(),
    OMT(),
    url({
      include: '**/*.wasm',
    }),
  ],
};
