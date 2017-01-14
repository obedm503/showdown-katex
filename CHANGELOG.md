## katex-latex changelog

> markdown + ( latex and/or asciimath )

### Future
#### NEW
- ...

#### FIX
- become independent from jQuery

### 0.3.0 2016-12-02
#### NEW
- `katex.config` object used to configure katex displayMode, errorColor, and throwOnError

#### FIXED
- wrapping `<div>` was substituted with a `<span>` to allow for flexibility
- demo now pretty prints normal code by using `bootmark`

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
