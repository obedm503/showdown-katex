// @ts-check
const { join } = require('path');
const { writeFile, readFile, ensureDir, copyFile } = require('fs-extra');
const ejs = require('ejs');

(async () => {
  const input = await readFile(join(__dirname, 'index.ejs'), 'utf-8');
  const SRC =
    process.env.NODE_ENV === 'production'
      ? 'https://unpkg.com/showdown-katex@latest/dist/showdown-katex.min.js'
      : 'showdown-katex.js';

  const out = await ejs.render(input, { SRC }, { async: true });
  await ensureDir(join(__dirname, 'dist'));
  await Promise.all([
    writeFile(join(__dirname, 'dist/index.html'), out),
    copyFile('CHANGELOG.md', 'dist/CHANGELOG.md'),
    copyFile('README.md', 'dist/README.md'),
  ]);
})();
