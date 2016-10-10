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
    throw Error('Could not find showdown library');
  }
	if(typeof jQuery === 'undefined'){ throw new Error('JQuery is not defined'); }
}(function (showdown) {
  // loading extension into showdown
  showdown.extension('katex-latex', function() {
		return [{
			type: 'output',
			filter: function(html){
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

				var $div = $('<div></div>').html(html);//parse html inside a <div>
				var $code = $('code.latex.language-latex', $div); //find our "code"
				$code.unwrap().each(function(i, e){// unwrap from <pre> tags

					var el = $( e );
					// convert latex to math
					var htmlFromTxt = katex.renderToString( el.text(), {
						displayMode: true,
						throwOnError: false, //fail silently
						errorColor: '#00c2c9'
					});
					// replace old <code> tags with math
					el.replaceWith( '<div class="katex-latex">' + htmlFromTxt + '</div>' );
				});
				//return html without the initial <div>
				return $div.html();
			}
		}];
  });
}));
