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
    throw Error('Could not find showdown library.');
  }
	if(typeof jQuery === 'undefined'){
		throw new Error('JQuery is not defined.');
	}
	if(typeof AMTparseAMtoTeX === 'undefined'){
		console.warn('AMTparseAMtoTeX is not defined. Make sure it is include the ASCIIMathTeXImg.js file.');
	}
	if(typeof AMTcgiloc !== 'undefined'){
		console.warn('A defined AMTcgiloc will cause katex-latex to stop working.');
	}
}(function (showdown) {
  // loading extension into showdown
  showdown.extension('katex-latex', function() {
		return [{
			type: 'output',
			filter: function(html){
				// katex config
				var config = $.extend({}, {
					displayMode: true,
					throwOnError: false, //fail silently
					errorColor: '#00c2c9'
				}, window.katex.config );

				//adds some styling to the math
				if( !$('#katex-latex-styles').length ){
					$('head').append(
						'<style id="katex-latex-styles" type="text/css">'+
							'.katex-latex {'+
								'font-size: 20px;'+
							'}'+
						'</style>'
					);
				}

				//parse html inside a <div>
				var $div = $('<div></div>').html(html);

				//find our "code"
				var $latex = $('code.latex.language-latex', $div);
				var $asciimath = $('code.asciimath.language-asciimath', $div);

				//handle latex
				if( $latex.length ){
					$latex.unwrap().each(function(i, e){
						var latexEl = $( e );
						// convert latex to math html
						var htmlFromLatex = katex.renderToString( latexEl.text(), config );
						// replace old <code> tags with math html
						latexEl.replaceWith( '<div class="katex-latex">' + htmlFromLatex + '</div>' );
					});
				}

				//handle asciimath
				if( $asciimath.length ){
					$asciimath.unwrap().each(function(i, e){
						var asciiEl = $( e );
						// convert asciimath to latex
						var txtFromAsciimath = AMTparseAMtoTeX( asciiEl.text() );
						// convert latex to math html
						var htmlFromAsciimath = katex.renderToString( txtFromAsciimath, config );
						// replace old <code> tags with math html
						asciiEl.replaceWith( '<div class="katex-latex">' + htmlFromAsciimath + '</div>' );
					});
				}

				//return html without the initial <div>
				return $div.html();
			}
		}];
  });
}));
