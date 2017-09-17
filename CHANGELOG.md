## katex-latex changelog

> markdown + ( latex and/or asciimath )

### Future
#### NEW
- rename to showdown-katex?
- move `window.katex.config` to `window.showdownKatex.config`?

#### FIX
- add inline latex examples
- add inline asciimath examples

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
