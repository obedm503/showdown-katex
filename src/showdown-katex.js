/** !
* @file showdown-katex: markdown + ( latex and/or asciimath )
* @author [obedm503](https://github.com/obedm503/)
* @git [git repo](https://github.com/obedm503/showdown-katex.git)
* @examples https://obedm503.github.io/showdown-katex/
* @license MIT
*/
import katex from 'katex';
import renderMathInElement from 'katex/dist/contrib/auto-render.min'
import asciimathToTex from './asciimath-to-tex';

/**
 * @param {NodeListOf<Element>} elements
 * @param config
 * @param {boolean} isAsciimath
 */
function renderBlockElements(elements, config, isAsciimath) {
  if (!elements.length) {
    return;
  }
  for (let i = 0, len = elements.length; i < len; i++) {
    const element = elements[i];
    const input = element.textContent;
    const latex = isAsciimath ? asciimathToTex(input) : input;
    const html = katex.renderToString(latex, config);
    element.parentNode.outerHTML = `<span title="${ input }">${ html }</span>`;
  }
}

/**
 * https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
 * @param {string} str
 * @returns {string} regexp escaped string
 */
function escapeRegExp(str) {
  return str.replace(/[-[\]/{}()*+?.\\$^|]/g, "\\$&");
}

// katex config
const getConfig = (config = {}) => ({
  displayMode: true,
  throwOnError: false, // fail silently
  errorColor: '#ff0000',
  ...config,
  delimiters: ([
    { left: "$$", right: "$$", display: true },
    { left: "\\[", right: "\\]", display: true },
    { left: "\\(", right: "\\)", display: false },
    { left: '~', right: '~', display: false, asciimath: true },
    // TODO: this doesn't work because the && is escaped to &amp;&amp; and so it's not recognized
    // 2019-01-08: it works now, don't know why
    { left: '&&', right: '&&', display: true, asciimath: true },
  ]).concat(config.delimiters || []),
});

const showdownKatex = (userConfig) => () => {
  return [
    // escape regex characters and convert asciimath to tex
    // the next sub-extension will convert tex to html
    // TODO: ignore stuff inside code (backticks)
    {
      type: 'output',
      filter(text = '') {
        const config = getConfig(userConfig);
        const delimiters = config.delimiters.filter(item => item.asciimath);
        if (!delimiters.length) {
          return text;
        }

        return delimiters.reduce((acc, delimiter) => {
          const test = new RegExp(
            `${ escapeRegExp(delimiter.left) }(.*?)${ escapeRegExp(delimiter.right) }`,
            'g',
          );
          return acc.replace(test, (match, asciimath) =>
            `${ delimiter.left }${ asciimathToTex(asciimath) }${ delimiter.right }`
          );
        }, text);
      },
    },
    // render math
    {
      type: 'output',
      filter(html) {
        const config = getConfig(userConfig);
        // parse html inside a <div>
        const div = document.createElement('div');
        div.innerHTML = html;

        // find our "code"
        const latex = div.querySelectorAll('code.latex.language-latex');
        const asciimath = div.querySelectorAll('code.asciimath.language-asciimath');

        renderBlockElements(latex, config);
        renderBlockElements(asciimath, config, true);
        renderMathInElement(div, config);

        // return html without the initial <div>
        return div.innerHTML;
      },
    },
  ];
}

// register extension with default config
if (typeof window.showdown !== 'undefined') {
  window.showdown.extension('showdown-katex', showdownKatex());
}

export default showdownKatex;
