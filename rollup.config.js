import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

const config = {
  name: 'katexLatex',
  sourcemap: true,
  input: './src/katex-latex.js',
  output: {
    file: './dist/katex-latex.js',
    format: 'umd',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**', // only transpile our source code
    })
  ],
};

if(process.env.MIN === 'true'){
  config.output.file = './dist/katex-latex.min.js';
  config.plugins.push(uglify({
    compress: {
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      warnings: true,
    }
  }));
}

export default config;