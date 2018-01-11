import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import inject from 'rollup-plugin-inject';

const config = {
  name: 'showdownKatex',
  sourcemap: true,
  input: './src/showdown-katex.js',
  output: {
    file: './dist/showdown-katex.js',
    format: 'umd',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**', // only transpile our source code
    }),
    resolve(),
    commonjs(),
    // inject because the auto render extension decided to assume `katex` is
    // available as a global
    inject({
      katex: 'katex',
    }),
  ],
};

if (process.env.MIN === 'true') {
  config.output.file = './dist/showdown-katex.min.js';
  config.plugins.push(uglify({
    output: {
      comments: /^!|@preserve|@license|@cc_on/ig,
    },
    compress: {
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      warnings: true,
    },
  }));
}

export default config;