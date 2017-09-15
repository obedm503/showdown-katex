/**!
* @file katex-latex: markdown + ( latex and/or asciimath )
* @author [obedm503](https://github.com/obedm503/)
* @git [git repo](https://github.com/obedm503/katex-latex.git)
* @examples https://obedm503.github.io/katex-latex/
* @version 0.2.0
* @license MIT
*/
import asciimathToTex from './asciimath-to-tex';

/**
 * @param {NodeListOf<Element>} elements
 * @param config
 * @param {boolean} isAsciimath
 */
function renderElements(elements, config, isAsciimath) {
  if (elements.length) {
    for (let i = 0, len = elements.length; i < len; i++) {
      const element = elements[i];
      const input = element.innerHTML;
      const latex = isAsciimath ? asciimathToTex(input) : input;
      const html = window.katex.renderToString(latex, config);
      element.parentNode.outerHTML = `<span title="${input}">${html}</span>`;
    }
  }
}

// is katex.config is undefined, it is an empty object
window.katex.config = window.katex.config || {};

const katexLatex = () => {
  return [
    // {
    //   type: 'lang',

    // },
    {
      type: 'output',
      filter: html => {
        // katex config
        const config = {
          ...window.katex.config,
          displayMode: true,
          throwOnError: false, //fail silently
          errorColor: '#ff0000',
        };

        //parse html inside a <div>
        const div = document.createElement('div');
        div.innerHTML = html;

        //find our "code"
        const latex = div.querySelectorAll('code.latex.language-latex');
        const asciimath = div.querySelectorAll('code.asciimath.language-asciimath');

        renderElements(latex, config);
        renderElements(asciimath, config, true);
        if (typeof window.renderMathInElement === 'function') {
          window.renderMathInElement(div, config);
        }

        //return html without the initial <div>
        return div.innerHTML;
      }
    },
  ];
}

// register extension
if (typeof window.showdown !== 'undefined') {
  window.showdown.extension('katex-latex', katexLatex);
}

export default katexLatex;
