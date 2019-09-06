// @ts-check
const { concurrent, series, rimraf, crossEnv } = require('nps-utils');

exports.scripts = {
  default: 'nps dev',
  docs: 'node docs.js',
  deploy: series('nps docs', 'gh-pages -d dist'),
  clean: rimraf('dist lib'),
  dev: series(
    'nps clean',
    concurrent({
      serve: 'http-server dist',
      docs: 'nodemon --watch index.ejs --exec "nps docs"',
      build: 'nodemon --watch src --exec "nps build.umd"',
    }),
  ),
  build: {
    default: series(
      'nps clean',
      crossEnv(
        `NODE_ENV=production ${concurrent.nps(
          'build.umd',
          'build.cjs',
          'build.min',
        )}`,
      ),
    ),
    umd: 'BABEL_ENV=build rollup -c',
    min: 'BABEL_ENV=build rollup -c --environment MIN',
    cjs: 'BABEL_ENV=build rollup -c --environment TARGET:cjs',
  },
};
