/**!
* @file katex-latex: markdown + ( latex and/or asciimath )
* @author [obedm503](https://github.com/obedm503/)
* @git [git repo](https://github.com/obedm503/katex-latex.git)
* @examples https://obedm503.github.io/katex-latex/
* @version 0.2.0
* @license MIT
*/
(function(extension) {
  if (typeof showdown !== 'undefined') {
    // global (browser or nodejs global)
    extension(showdown);
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(['showdown'], extension);
  } else if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = extension(require('showdown'));
  } else {
    // showdown was not found so we throw
    throw new Error('Could not find showdown library.');
  }
}(function (showdown) {

  /**
   * @param {NodeList} elements
   * @param {boolean} ascii
   */
  function processEls(config, elements, ascii){
    if(elements.length){
      for (let i = 0, len = elements.length; i < len; i++) {
        const element = elements[i];
        const tex = ascii ? AMTparseAMtoTeX( element.innerHTML ) : element.innerHTML;
        const html = katex.renderToString( tex, config );
        element.parentNode.outerHTML = `<span class="katex-latex">${html}</span>`;
      }
    }
  }

  // is katex.config is undefined, it is an empty object
  window.katex.config = window.katex.config || {};

  // loading extension into showdown
  showdown.extension('katex-latex', function() {
    return [{
      type: 'output',
      filter: function(html){
        // katex config
        const config = Object.assign({}, {
          displayMode: true,
          throwOnError: false, //fail silently
          errorColor: '#ff0000',
        }, window.katex.config);

        //adds some styling to the math
        if( !document.getElementById('katex-latex-styles') ){
          const styles = document.createElement('style');
          styles.id = 'katex-latex-styles';
          styles.innerHTML = '.katex-latex { font-size: 20px; }';
          document.head.appendChild(styles);
        }

        //parse html inside a <div>
        const div = document.createElement('div');
        div.innerHTML = html;

        //find our "code"
        const latex = div.querySelectorAll('code.latex.language-latex');
        const asciimath = div.querySelectorAll('code.asciimath.language-asciimath');

        processEls(config, latex);
        processEls(config, asciimath, true);
        if( typeof renderMathInElement !== 'undefined' ){
          renderMathInElement(div, config);
        }

        //return html without the initial <div>
        return div.innerHTML;
      }
    }];
  });
}));
