# katex-latex

> https://obedm503.github.io/katex-latex/

Showdown extension to display math using [KaTeX](https://khan.github.io/KaTeX/) and [LaTeX](https://www.latex-project.org/) or [AsciiMath](http://asciimath.org/)

Special characters do not need escaping. katex-latex currently depends on jquery, but is intended to become independent.

> intended to work alongside [bootmark](https://obedm503.github.io/bootmark/)

## Config

You can customize what gets passed to the katex renderer by using the `window.katex.config` object.

These are the dafault

```js
{
	displayMode: true,
	throwOnError: false, //allows katex to fail silently
	errorColor: '#00c2c9'
}
```

Maybe you want to disable `displayMode`:

```js
window.katex.config = {
	displayMode: false
};
```
Check [katex for more options](https://github.com/Khan/KaTeX#user-content-rendering-options).

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
    \displaystyle{x}=\frac{{-{b}\pm\sqrt{{{b}^{2}-{4}{a}{c}}}}}{{{2}{a}}}
    ```

```latex
\displaystyle{x}=\frac{{-{b}\pm\sqrt{{{b}^{{2}}-{4}{a}{c}}}}}{{{2}{a}}}
```

They will both render the exact same thing. The examples will render correctly [here](https://obedm503.github.io/katex-latex/).

----
