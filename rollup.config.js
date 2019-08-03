import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import inject from 'rollup-plugin-inject';
import license from 'rollup-plugin-license';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';

/** @type {import('rollup').RollupOptions} */
const config = {
  input: './src/showdown-katex.js',
  output: {
    name: 'showdownKatex',
    sourcemap: true,
    file: './dist/showdown-katex.js',
    format: 'umd',
  },
  external: [],
  plugins: [
    replace({ 'process.env.TARGET': `"${process.env.TARGET}"` }),
    babel({
      exclude: 'node_modules/**', // only transpile our source code
    }),
  ],
};

if (process.env.TARGET !== 'cjs') {
  // web environment
  config.external.push('showdown');
  config.output.globals = {
    showdown: 'showdown',
  };

  config.plugins.push(
    resolve(),
    commonjs(),
    // inject because the auto render extension decided to assume `katex` is
    // available as a global
    inject({
      katex: 'katex',
    }),
  );
}

if (process.env.TARGET === 'cjs') {
  // node environment
  config.output.file = './lib/showdown-katex.js';
  config.output.format = 'cjs';
  config.external.push(
    'showdown',
    'jsdom',
    'katex',
    'katex/dist/contrib/auto-render',
  );
}

if (process.env.MIN === 'true') {
  config.output.file = './dist/showdown-katex.min.js';
  config.plugins.push(
    terser({
      output: {
        comments: /^!|@preserve|@license|@cc_on/gi,
      },
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
      },
    }),
  );
}

config.plugins.push(
  license({
    banner: `/**!
 * @file showdown-katex: markdown + ( latex and/or asciimath )
 * @author obedm503
 * @git https://github.com/obedm503/showdown-katex.git
 * @examples https://obedm503.github.io/showdown-katex/
 * @license MIT
 */`,
  }),
);

export default config;
