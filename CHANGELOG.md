## showdown-katex changelog

### Future
#### BREAKING
#### NEW
#### FIX
- documentation build system

### 0.6.0
#### FIX
- rendering math inside inline code and code blocks
#### BREAKING
- make `$$` latex delimiter inline instead of display mode
- use code block style to use display mode
  - remove `\\[ ... \\]` latex delimiter
  - remove `\\( ... \\)` latex delimiter
  - remove `&&` asciimath delimiter

### 0.5.0 2019-01-28
#### NEW
- update `katex` dependency to `0.10.0`
#### FIXED
- `&&` asciimath separator seems to work now `¯\_(ツ)_/¯`
- correct files now uploaded to npm
- eslint errors

### 0.4.0 2017-01-10
#### NEW
- rename to showdown-katex
- disallow global config
- move `window.katexLatex` to `window.showdownKatex`
- katex is now bundled with showdownKatex, so there's no need to include externally anymore.
#### FIXED
- add inline latex examples
- add inline asciimath examples
- remove `&&` as a delimiter for asciimath in displayMode. it was giving too mouch trouble. For asciimath in displayMode, use code block style with the lang set to `asciimath`. so:

        && E=mc^2 &&
  becomes

        ```asciimath
        E=mc^2
        ```

#### MIGRATION
- update references to `katex-latex` in files and showdown extension and update to `showdown-katex`
- if previously using global config, it should now be passed to the global `showdownKatex` function which returns a showdown extension that can be passed as part of the `extensions` array

        // before
        window.katexLatex.config = {
          throwOnError: true,
        };
        // now
        const converter = new showdown.Converter({
          extensions: [showdownKatex({
            throwOnError: true,
          })]
        });
        converter.makeHtml('~x=2~')

  if not using custom config, just list `"showdown-katex"` in the extensions

### 0.3.1 2017-09-17
#### FIXED
- publish to unpkg
- remove from bower

### 0.3.0 2017-09-16
#### MIGRATION
- there is no longer a version without the asciimath to tex script, so there is no `katex-latex.bundle.js`. just include `katex-latex.js` or `katex-latex.min.js`.
- if you want inline math rendering make sure to include the auto-render extension

#### NEW
- moved from gulp to npm scripts and rollup based build system
- moved `dist/ASCIIMathTeXImg.js` to `src/asciimath-to-tex.js`, adopting it into the source of the project
- treeshaking the extra functions in `asciimath-to-tex.js`
- moved to es6 thanks to babel and rollup
- added katex auto-render extension integration. it is not bundled along with katex-latex. so there is inline latex and asciimath support now!
- exports showdown extension function as default and defines `window.katexLatex` function
- show source expression on hover as the `<span>`'s `title`
- set up testing environment with ava

#### FIXED
- wrapping `<div>` was substituted with a `<span>` to allow for flexibility
- demo now pretty prints normal code by using `bootmark`
- no more jquery dependency!
- better organized examples

### 0.2.0 2016-10-10
#### NEW
- asciimath support
- custom asciimath syntax
- allow users to customize katex rendering through `window.katex.config` object
- bundle file includes what's necessary to render asciimath, but not KaTeX it self

#### FIXED
- ...

### 0.1.0 2016-10-09
#### NEW
- doesn't require characters to be escaped
- support custom latex syntax on markdown
- plays well with [bootmark](https://obedm503.github.io/bootmark/)

#### FIXED
- ...
