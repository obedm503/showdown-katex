import it from 'ava';
import asciimathToTex from '../src/asciimath-to-tex';

it('just a number', t => {
  t.is(asciimathToTex('5'), '{5}');
});

it('x=5', t => {
  t.is(asciimathToTex('x=5'), '{x}={5}');
});

it('x=5+2', t => {
  t.is(asciimathToTex('x=5+2'), '{x}={5}+{2}');
});

it('x = (-b+-sqrt(b^2-4ac))/(2a)', t => {
  t.is(asciimathToTex('x = (-b+-sqrt(b^2-4ac))/(2a)'), '{x}=\\frac{{-{b}\\pm\\sqrt{{{b}^{{2}}-{4}{a}{c}}}}}{{{2}{a}}}');
});

it('{x}=(-b+-sqrt(b^2-4ac))/(2a)', t => {
  t.is(asciimathToTex('{x}=(-b+-sqrt(b^2-4ac))/(2a)'), '{\\left\\lbrace{x}\\right\\rbrace}=\\frac{{-{b}\\pm\\sqrt{{{b}^{{2}}-{4}{a}{c}}}}}{{{2}{a}}}');
});