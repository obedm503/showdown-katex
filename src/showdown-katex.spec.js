import test from 'ava';
import showdown from 'showdown';
import katex from '../lib/showdown-katex.js';

const input = '# hello, markdown!';
const output = '<h1 id="hellomarkdown">hello, markdown!</h1>';

test('string extension', t => {
  const converter = new showdown.Converter({
    extensions: ['showdown-katex'],
  });
  t.is(converter.makeHtml(input), output);
});

test('function extension', t => {
  const converter = new showdown.Converter({
    extensions: [katex()],
  });

  t.is(converter.makeHtml(input), output);
});
