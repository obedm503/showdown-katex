// @ts-check
import katex from 'katex';
import renderMathInElement from 'katex/dist/contrib/auto-render';
import showdown from 'showdown';
import asciimathToTex from './asciimath-to-tex';

if (process.env.TARGET === 'cjs') {
  const { JSDOM } = require('jsdom');
  const jsdom = new JSDOM();
  // @ts-ignore
  global.DOMParser = jsdom.window.DOMParser;
  // @ts-ignore
  global.document = jsdom.window.document;
}

/**
 * @param {string} latex
 * @param config
 */
function renderBlock(latex, config) {
  const html = katex.renderToString(latex, config);
  return `<div title="${latex.trim()}">${html}</div>`;
}

// katex config
function getConfig(config = {}) {
  const delimiters = (config.delimiters || []).concat([
    { left: '$$', right: '$$', display: false },
    { left: '~', right: '~', display: false, asciimath: true },
  ]);
  return Object.assign(
    {
      displayMode: true,
      throwOnError: false, // fail silently
      errorColor: '#ff0000',
    },
    config,
    { delimiters },
  );
}

export default function showdownKatex(userConfig) {
  const parser = new DOMParser();
  const config = getConfig(userConfig);

  const asmDelimiters = [];
  const texDelimiters = [];
  config.delimiters.forEach(d => {
    if (d.asciimath) {
      asmDelimiters.push(d);
    } else {
      texDelimiters.push(d);
    }
  });
  const asmConfig = Object.assign({}, config, {
    delimiters: asmDelimiters,
    preProcess: asciimathToTex,
  });
  const texConfig = Object.assign({}, config, { delimiters: texDelimiters });

  return () => {
    return [
      // render block-style math
      {
        type: 'lang',
        regex: /(?:^```asciimath)([\s\S]*?)(?:^```)/gm,
        replace(block, asm) {
          const latex = asciimathToTex(asm);
          return renderBlock(latex, config);
        },
      },
      {
        type: 'lang',
        regex: /(?:^```latex)([\s\S]*?)(?:^```)/gm,
        replace(block, latex) {
          return renderBlock(latex, config);
        },
      },
      // render inline math
      {
        type: 'output',
        filter(html = '') {
          if (!config.delimiters.length) {
            return html;
          }

          // parse html
          const wrapper = parser.parseFromString(html, 'text/html').body;

          if (asmDelimiters.length) {
            renderMathInElement(wrapper, asmConfig);
          }

          if (texDelimiters.length) {
            renderMathInElement(wrapper, texConfig);
          }

          // return html without the wrapper
          return wrapper.innerHTML;
        },
      },
    ];
  };
}

// register extension with default config
showdown.extension('showdown-katex', showdownKatex());
