# showdown-katex

> `npm install showdown-katex`

[Showdown](https://github.com/showdownjs/showdown) extension to render [LaTeX](https://www.latex-project.org/) math and [AsciiMath](http://asciimath.org/) using [KaTeX](https://khan.github.io/KaTeX/);

Special characters do not need escaping

> Works well alongside [bootmark](https://obedm503.github.io/bootmark/)

## Config

You can customize what gets passed to the katex renderer by passing a config object.

These are the defaults:

```js
{
  displayMode: true,
  throwOnError: false, // allows katex to fail silently
  errorColor: '#ff0000',
  delimiters: [
    { left: "$$", right: "$$", display: false }, // katex default
    { left: '~', right: '~', display: false, asciimath: true },
  ],
}
```

Examples:

```html
<script>
  const converter = new showdown.Converter({
    extensions: [
      showdownKatex({
        // maybe you want katex to throwOnError
        throwOnError: true,
        // disable displayMode
        displayMode: false,
        // change errorColor to blue
        errorColor: '#1500ff',
      }),
    ],
  });
  converter.makeHtml('~x=2~');
</script>
```
Check [katex for more details](https://github.com/Khan/KaTeX#user-content-rendering-options).

## FOUC

If your page suffers from a "Flash Of Unstyled Content,"  add this to your `<body>` tag:

```html
<body style="display:none;" onload="document.body.style.display='block'">
```
This hides the body and shows it only when the JavaScript has loaded.

## Math Example

    ```asciimath
    x = (-b +- sqrt(b^2-4ac)) / (2a)
    ```

```asciimath
x = (-b +- sqrt(b^2-4ac)) / (2a)
```

    ```latex
    x=\frac{ -b\pm\sqrt{ b^2-4ac } } {2a}
    ```

```latex
x=\frac{ -b\pm\sqrt{ b^2-4ac } } {2a}
```

They will both render the exact same thing. If the examples don't render correctly click [here](https://obedm503.github.io/showdown-katex/).

----
