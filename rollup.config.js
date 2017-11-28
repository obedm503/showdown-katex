import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

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
    })
  ],
};

if (process.env.MIN === 'true') {
  config.output.file = './dist/showdown-katex.min.js';
  config.plugins.push(uglify({
    output: {
      comments: /^!|@preserve|@license|@cc_on/i
    },
    compress: {
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      warnings: true,
    }
  }));
}

export default config;