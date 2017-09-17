import test from 'ava';
import asciimathToTex from '../src/asciimath-to-tex';

test('things shouldn\'t be unnecessarily wrapped in brackets', t => {
  t.is(asciimathToTex('5'), '5');
});