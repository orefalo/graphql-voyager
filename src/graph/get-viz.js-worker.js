import loadWASM from '@aduh95/viz.js/worker';
import wasmLocation from '@aduh95/viz.js/wasm';

loadWASM({
  locateFile: () => wasmLocation,
});
