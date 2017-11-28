[![Stories in Ready](https://badge.waffle.io/obedm503/showdown-katex.png?label=ready&title=Ready)](https://waffle.io/obedm503/showdown-katex)
# showdown-katex

> https://obedm503.github.io/showdown-katex/

Showdown extension to display math using [KaTeX](https://khan.github.io/KaTeX/) and [LaTeX](https://www.latex-project.org/) or [AsciiMath](http://asciimath.org/)

Special characters do not need escaping. showdown-katex is no longer dependent on jQuery!

> Works well alongside [bootmark](https://obedm503.github.io/bootmark/)

## Config

You can customize what gets passed to the katex renderer by using the `katex.config` object.

These are the defaults:

```js
{
  displayMode: true,
  throwOnError: false, //allows katex to fail silently
  errorColor: '#ff0000',
  [
    { left: "$$", right: "$$", display: true }, // katex default
    { left: "\\[", right: "\\]", display: true }, // katex default
    { left: "\\(", right: "\\)", display: false }, // katex default
    { left: '~', right: '~', display: false, asciimath: true },
    { left: '&&', right: '&&', display: true, asciimath: true },
  ],
}
```

Examples:

```html
<script>
  // disable displayMode
  katex.config.displayMode = false;

  // maybe you want katex to throwOnError
  katex.config.throwOnError = true;

  // change errorColor to blue
  katex.config.errorColor = '#1500ff';
</script>
```
Check [katex for more details](https://github.com/Khan/KaTeX#user-content-rendering-options).

## FOUC

If your page suffers from a "Flash Of Unstyled Content,"  add this to your `<body>` tag:

```html
<body  style="display:none;" onload="$('body').show();">
```
This hides the body and shows it only when the JavaScript has loaded.

## Math Example

in asciimath

    ```asciimath
    x = (-b+-sqrt(b^2-4ac))/(2a)
    ```

```asciimath
x = (-b+-sqrt(b^2-4ac))/(2a)
```

in latex

    ```latex
    x=\frac{ -b\pm\sqrt{ b^2-4ac } } {2a}
    ```

```latex
x=\frac{ -b\pm\sqrt{ b^2-4ac } } {2a}
```

They will both render the exact same thing. If the examples don't render correctly click [here](https://obedm503.github.io/showdown-katex/).

----
