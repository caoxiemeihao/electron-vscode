const path = require('path');
const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
const json = require('@rollup/plugin-json');

module.exports = function (env = 'production' || 'development', proc = 'main' || 'preload') {
  /**
   * @type {import('rollup').RollupOptions}
   */
  const options = {
    input: path.join(__dirname, `../src/${proc}/index.ts`),
    output: {
      dir: path.join(__dirname, `../dist/${proc}`),
    },
    plugins: [
      commonjs(),
      nodeResolve({
        // extensions: ['.mjs', '.js', '.json', '.node'],
      }),
      typescript(),
      json(),
    ],
    external: [
      'electron',
    ],
  };

  return options;
};
